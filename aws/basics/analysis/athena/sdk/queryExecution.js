/** 
Athenaのクエリ実行SDKは下記流れとなる。
 1. クエリの実行開始（StartQueryExecutionCommand）
    クエリが完了するまで待ってくれるわけではない
 2. クエリの取得が完了しているか確認（GetQueryExecutionCommand）
    手順1でクエリが完了するまで待つわけではない為、クエリが完了しているか1秒ごとに確認する必要がある（ステータスを取得：QueryExecutionState）
 3. クエリの取得（GetQueryResultsCommand）
    手順2で、クエリの取得が完了している場合、結果を取得する。
*/

import {
    AthenaClient,
    StartQueryExecutionCommand,
    GetQueryExecutionCommand,
    GetQueryResultsCommand,
    QueryExecutionState,
  } from "@aws-sdk/client-athena";
  
  // =========== Base parameters ============
  const config = { region: "ap-northeast-1" };
  const client = new AthenaClient(config);
  // ==========================================
  
  // =========== Input parameters ============
  const catalog = "AwsDataCatalog";
  const database = "test-db";
  const workGroup = "test-work-group";
  // ==========================================
  
  const handler = async (event) => {
    try {
      // userIdはLambdaのevent引数 or ログインユーザーを取得する処理で受け取る
      const userId = 1;
      const queryString = makeNewQuery(userId);
  
      // SQL実行開始
      const { QueryExecutionId } = await startQueryExecution(queryString);
  
      // SQLの処理完了を待つ
      await waitExecutionFinised(QueryExecutionId);
  
      // 結果を取得
      const result = await getQueryResults(QueryExecutionId);
      return result;
    } catch (e) {
      console.error(e);
      throw new Error(e?.message);
    }
  };
  
  /** SQLを実行開始処理 */
  const startQueryExecution = async (queryString) => {
    const input = {
      QueryString: queryString,
      QueryExecutionContext: {
        Catalog: catalog,
        Database: database,
      },
      WorkGroup: workGroup
    };
  
    try {
      const command = new StartQueryExecutionCommand(input);
      const response = await client.send(command);
      return response;
    } catch (e) {
      throw e;
    }
  };
  
  /** SQLの実行ステータスを確認 */
  const getQueryExecution = async (queryExecutionId) => {
    const input = {
      QueryExecutionId: queryExecutionId,
    };
    try {
      const command = new GetQueryExecutionCommand(input);
      const response = await client.send(command);
      return response;
    } catch (e) {
      throw e;
    }
  };
  
  /** 結果を取得する */
  const getQueryResults = async (queryExecutionId) => {
    const input = {
      QueryExecutionId: queryExecutionId,
    };
    try {
      const command = new GetQueryResultsCommand(input);
      const response = await client.send(command);
  
      const result = response?.ResultSet?.Rows?.map((row) => {
        return {
          itemId: row?.Data?.[0].VarCharValue,
          timestamp: row?.Data?.[1].VarCharValue,
        };
      });
      // NOTE: 配列の最初の要素には、値でなくカラム名が入っている為、削除する。
      return result.slice(1);
    } catch (e) {
      throw e;
    }
  };
  
  /** SQLの処理が完了するまで待つ */
  const waitExecutionFinised = async (queryExecutionId) => {
    /** ステータスチェックを行う間隔 */
    const GET_STATUS_INTERVAL = 1000;
    const LIMIT_COUNT = 30;
    let count = 0;
    let status = QueryExecutionState.QUEUED;
  
    try {
      while (status !== QueryExecutionState.SUCCEEDED) {
        // ステータスを取得
        const response = await getQueryExecution(queryExecutionId);
        status = response?.QueryExecution?.Status?.State;
  
        // 処理が終了していない場合を1秒間待つ
        if (
          status === QueryExecutionState.QUEUED ||
          status === QueryExecutionState.RUNNING
        ) {
          await new Promise((resolve) => setTimeout(resolve, GET_STATUS_INTERVAL));
        } else {
          break;
        }
  
        // リトライ数の上限
        count++;
        if (count === LIMIT_COUNT) {
          throw new Error("タイムオーバー");
        }
      }
    } catch (e) {
      throw e;
    }
  };
  
  const makeNewQuery = (userId) => {
    const queryString = `WITH latest_interactions AS (
          SELECT
              "interactions"."item_id",
              "interactions"."timestamp"
          FROM
              "kusumoto-db"."interactions" AS "interactions"
          WHERE "interactions"."user_id" = ${userId}
          ORDER BY
              "interactions"."timestamp" DESC
          LIMIT 3
      )
      
      
      SELECT
          "items"."item_id",
          "latest_interactions"."timestamp"
      FROM
          "kusumoto-db"."items" AS "items"
          INNER JOIN
              "latest_interactions"
          ON  "items"."item_id" = "latest_interactions"."item_id"
      ORDER BY "latest_interactions"."timestamp" DESC;`;
    return queryString;
  };
  
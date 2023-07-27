/**
 * レコメンダーは自動更新される仕様だが、任意のタイミングで更新したい場合がある。
 * UpdateRecommenderCommand を使えば、手動でレコメンダーを更新できる。
 * 
 * 下記のレコメンダーは2時間おきに自動更新される。それ以外は1週間で自動更新される。
 * ・Top picks for you
 * ・Trending now
 */

// SDK for JavaScript V3
import {
    PersonalizeClient,
    UpdateRecommenderCommand,
  } from "@aws-sdk/client-personalize";
  
  export const handler = async (event) => {
    const config = { region: "ap-northeast-1" };
    const client = new PersonalizeClient(config);
  
    const input = {
      recommenderArn:
        "arn:aws:personalize:ap-northeast-1:837933661307:recommender/most-popular",
      recommenderConfig: {
        trainingDataConfig: {
          excludedDatasetColumns: {
            // NOTE: FOR_UPDATE_RECOMMENDERは何もデータがない、nullのカラム。更新する為には excludedDatasetColumns でカラムを追加する必要がある為、アップデート用の不要なカラムを作成
            // FOR_UPDATE_RECOMMENDERカラムは常にトレーニングから除外していても問題なく、レコメンド結果は更新される。
            "Items": ["FOR_UPDATE_RECOMMENDER"]
          },
        },
      },
    };
  
    const updateRecommender = async () => {
      try {
        const command = new UpdateRecommenderCommand(input);
        const response = await client.send(command);
        console.log("Success=====>", response);          
        return response;
      } catch (err) {
        console.log("Error=====>", err);
      }
    };
    const result = await updateRecommender();
    return result;
  };
// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

// const searchFiles = async () => {
//   const bucketName = 'kusumoto-test-for-personalize';
//   // const prefix = 'interactions/2023/6/22/';
//   const prefix = 'interactions/2023/6/22/interactions-10件データ.csv';

//   const params = {
//     Bucket: bucketName,
//     StartAfter: prefix
//   };
//   const listObjectsResponse = await s3.listObjectsV2(params).promise();
//   const files = listObjectsResponse.Contents.map(
//     (object) => `s3://${bucketName}/${object.Key}`
//   );
//   console.log("🥎", files);
//   return files;
// }
// ==========================================================================================

// ==========================================================================================
// TODO: intractions用なのか判定するもの。canUploadToS3の処理はintractionsのみ使用する
// NOTE: 下記の資料はpapaparseの公式ドキュメントです。
// https://www.papaparse.com/docs#json-to-csv
// ==========================================================================================

import { DateTime } from "luxon";
import csv from "csv-parser";
import Papa from "papaparse";
import AWS from "aws-sdk";
const s3 = new AWS.S3();

const schemaTypeEnum = {
  INTERACTIONS: "interactions",
  USERS: "users",
  ITEMS: "items",
};

export const handler = async (event) => {
  // TODO: 引数のeventから取得できるようにする
  const schemaType = schemaTypeEnum.INTERACTIONS;
  const { date, time } = getCurrentDateTimeStr();
  // NOTE: test data
  // const date = "2023/6/22";
  // const time = "01:00";

  const downloadBucketName = "kusumoto-row-csv-bucket";
  // WARNING: ファイル名までのパスを入力しないと、ファイルだけでなくフォルダごと取得してしまう。例：prefix = "interactions/2023/06/26"にすると、「interactions/2023/06/26」フォルダを取得してしまう。
  const prefix = `${schemaType}/${date}/interactions`;
  const uploadBucketName = "kusumoto-test-for-personalize";
  const uploadObjectKey = `${schemaType}/${date}/${time}-merged.csv`;

  try {
    // objectキーを取得する為、Firehiseで作成されたファイルを全て取得する
    const bucketObjects = await searchBucketObjects(downloadBucketName, prefix);
    // CSVファイルが1つもなければ処理が終了
    if (bucketObjects.length === 0) return;

    let mergedArray = [];
    for (const object of bucketObjects) {
      // FirehoseのS3の全てのCSVファイルの中身を取得
      const bucketObj = await getObject(downloadBucketName, object.Key);
      // 取得したCSVをJSオブジェクトにパースする
      const parsedData = await parseCSV(bucketObj.Body);
      // mergedArray配列にマージする
      mergedArray = [...mergedArray, ...parsedData];
    }

    if (
      schemaType === schemaTypeEnum.USERS ||
      schemaType === schemaTypeEnum.ITEMS ||
      (schemaType === schemaTypeEnum.INTERACTIONS && canUploadToS3(mergedArray))
    ) {
      // JSオブジェクトからcsvに変換し、S3にアップロードする為にbuffer形式にする
      const csvBuffer = concertCSV(mergedArray);
      // PersonalizeのS3へアップロード
      await putObjectCSV(uploadBucketName, uploadObjectKey, csvBuffer);

      const result = await deleteObjects(downloadBucketName, bucketObjects);
      return result;
      // TODO: 削除に失敗した場合のエラーハンドリング
    } else {
      console.warn(
        "interactionsデータのインポートに必要な条件が足りませんでした。"
      );
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

/** S3のリストを取得する */
const searchBucketObjects = async (bucketName, prefix) => {
  const params = {
    Bucket: bucketName,
    StartAfter: prefix,
  };
  try {
    const listObjectsResponse = await s3.listObjectsV2(params).promise();
    // const objectKeys = listObjectsResponse.Contents.map((object) => object.Key);

    const bucketObjects = listObjectsResponse.Contents.map((object) => {
      return { Key: object.Key };
    });
    return bucketObjects;
  } catch (err) {
    throw err;
  }
};

/** S3のobjectを取得する（CSVを取得する為） */
const getObject = async (bucketName, objectKey) => {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };
  try {
    const object = await s3.getObject(params).promise();
    return object;
  } catch (err) {
    throw err;
  }
};

/** Personalize読み取り用のS3へアップロードする為の処理 */
const putObjectCSV = async (bucketName, objectKey, csvBuffer) => {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: csvBuffer,
  };

  try {
    const result = await s3.putObject(params).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

/** 一度取り込んだS3のオブジェクトを削除する処理。取り込んだファイルがどれなのか判別できるように削除しました。 */
const deleteObjects = async (bucketName, bucketObjects) => {
  const params = {
    Bucket: bucketName,
    Delete: { Objects: bucketObjects },
  };

  try {
    const result = await s3.deleteObjects(params).promise();
    return result;
  } catch (err) {
    throw err;
  }
};

/** Personalizeのinteractionsデータに必要な条件を満たしている場合、trueを返す */
const canUploadToS3 = (inputData) => {
  // instractionsに必要なデータ数
  const REQUIRE_RECORD_COUNT = 1000;
  const REQUIRE_USER_ID_COUNT = 25;

  // レコードが1000件以上か確認する
  if (inputData.length < REQUIRE_RECORD_COUNT) return false;

  // ユーザーIDが25個以上あるか確認する
  const array = [];
  for (let i = 0; i < inputData.length; i++) {
    const userId = inputData[i].USER_ID;
    const isExist = array.includes(userId);
    if (!isExist) {
      array.push(userId);
    }
    if (array.length >= REQUIRE_USER_ID_COUNT) {
      return true;
    }
  }
  return false;
};

// HACK: csv-parser ではなく、papaparse で実装する
/** CSVをJSオブジェクトにparseする */
const parseCSV = (csvData) => {
  // write csv data
  const stream = csv();
  stream.write(csvData);

  // output csv data
  return new Promise((resolve) => {
    const array = [];
    stream.on("data", (data) => array.push(data));
    stream.on("end", () => {
      resolve(array);
    });
    stream.end();
  });
};

/** CSVに変換後、S3で保存可能な形式に変換する */
const concertCSV = (inputData) => {
  // CSVの文字列に変換する
  const csvString = Papa.unparse(inputData);
  // console.log("🍙===>", csvString)

  // CSV形式のテキストデータをBufferに変換する
  const csvBuffer = Buffer.from(csvString);
  return csvBuffer;
};

/** 現在の日付・時刻を文字列で返します */
const getCurrentDateTimeStr = () => {
  const now = DateTime.now().setZone("Asia/Tokyo");
  const currentDateStr = now.toFormat("yyyy/MM/dd");
  const currentTimeStr = now.toFormat("HH:mm");

  return {
    date: currentDateStr,
    time: currentTimeStr,
  };
};

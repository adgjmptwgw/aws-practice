const AWS = require("aws-sdk");

const streamName = "PUT-S3-dynamic-partitioning-kusumoto";
// const streamName = "PUT-S3-xsJyk";

const inputData = {
  name: "kusumoto",
  // 動的パーティショニング用のkey
  type: "test3",
};

const jsonData = JSON.stringify(inputData);

const params = {
  DeliveryStreamName: streamName,
  Record: { Data: jsonData },
};

const firehose = new AWS.Firehose({
  apiVersion: "2015-08-04",
  region: "ap-northeast-1",
});

// // S3にデータを送信する
const putRecordToS3 = async () => await firehose.putRecord(params).promise();

// 失敗するたびに再送信する
const putRecordWithRetry = async () => {
  try {
    const response = await putRecordToS3();
    console.log("Success:", response);
  } catch (err) {
    console.error("Error:", err);
    // --------------------------<エラーハンドリング１>-----------------------------
    if (err.code == "ServiceUnavailableException") {
      // NOYE: ServiceUnavailableExceptionの場合は再試行するべきという事が公式にも記載あり。
      // TODO: while文で成功するまで繰り返す。n回繰り返して成功しなければ処理を止める。
      await putRecordToS3();
    }

    // --------------------------<エラーハンドリング２>-----------------------------
    if (err instanceof ServiceUnavailableException) {
      // TODO: while文で成功するまで繰り返す。n回繰り返して成功しなければ処理を止める。
      await putRecordToS3();
    }

    // --------------------------<エラーハンドリング３>-----------------------------
    // errorのフォルダにリクエストが格納されるため、そのデータを再度送信する実装方法
  }
};

putRecordWithRetry();

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
  // AWS Cloud Shell では設定不要
  // accessKeyId: ACCESS_KEY_ID,
  // secretAccessKey: SECRET_ACCESS_KEY,
});

const putRecordToS3 = async () => {
  try {
    const response = await firehose.putRecord(params).promise();
    console.log("Success:", response);
  } catch (err) {
    console.log("Error:", err);
  }
};

putRecordToS3();

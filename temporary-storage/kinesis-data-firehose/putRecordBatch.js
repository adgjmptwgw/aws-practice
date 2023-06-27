const AWS = require("aws-sdk");

const firehose = new AWS.Firehose({
  apiVersion: "2015-08-04",
  region: "ap-northeast-1",
  // AWS Cloud Shell では設定不要
  // accessKeyId: ACCESS_KEY_ID,
  // secretAccessKey: SECRET_ACCESS_KEY,
});

const inputData = {
    id: 1,
    name: "kusumoto"
};
const jsonData = JSON.stringify(inputData);

const params = {
    DeliveryStreamName: "PUT-S3-xsJyk",
    Records: [
        {
            Data: jsonData
        },
    ]
};

firehose.putRecordBatch(params, (err, data) => {
    if (err) {
        console.log(`エラーメッセージ🐛: ${err}`);
    } else {
        console.log(`成功 🍙: ${data}`);
        console.log(`FailedPutCount 🍙: ${data?.FailedPutCount}`);
        console.log(`Encrypted 🍙: ${data?.Encrypted}`);
        console.log(`RequestResponses 🍙: ${data?.RequestResponses}`);
        console.log(`RecordId 🍙: ${data?.RequestResponses?.[0]?.RecordId}`);
    }
});
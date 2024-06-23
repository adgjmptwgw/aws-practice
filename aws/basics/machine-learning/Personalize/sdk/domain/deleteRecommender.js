/**
 * レコメンダーの削除を行う。
 */

// TODO: AWS SDK for JavaScript V3 にリファクタリングする


const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const personalize = new AWS.Personalize();

const params = {
  recommenderArn:
    "arn:aws:personalize:ap-northeast-1:837933661307:recommender/kusumoto-most-popular",
};

const deleteVODRecommender = async () => {
  try {
    const response = await personalize.deleteRecommender(params).promise();
    console.log("🍙", response);
  } catch (err) {
    console.log("🐛", err, err.stack);
  }
};

deleteVODRecommender();

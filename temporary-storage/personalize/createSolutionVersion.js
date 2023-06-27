const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const personalize = new AWS.Personalize();
const solutionArn = "arn:aws:personalize:ap-northeast-1:837933661307:solution/kusumoto-popularity-count";

const params = {
    solutionArn: solutionArn,
    trainingMode: 'FULL', // トレーニングの範囲を指定します。FULL または UPDATE を指定可能です。
    name: 'kusumoto-popularity-count', // ソリューションバージョンの名前
  }

const createVODRecommender = async () => {
    try {
      const response = await personalize.createSolutionVersion(params).promise();
      console.log("🍙", response);
    } catch (err) {
      console.log("🐛", err, err.stack);
    }
  };
  
  createVODRecommender();


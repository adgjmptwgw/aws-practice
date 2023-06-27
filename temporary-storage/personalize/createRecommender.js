const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const personalize = new AWS.Personalize();

const MOST_POPULAR_ARN = "arn:aws:personalize:::recipe/aws-vod-most-popular";

const params = {
  datasetGroupArn:
    "arn:aws:personalize:ap-northeast-1:837933661307:dataset-group/kusumoto-test-video-on-demand",
  name: "kusumoto-most-popular",
  recipeArn: MOST_POPULAR_ARN,
};

const createVODRecommender = async () => {
  try {
    const response = await personalize.createRecommender(params).promise();
    console.log("🍙", response);
  } catch (err) {
    console.log("🐛", err, err.stack);
  }
};

createVODRecommender();

// =============================================================
/**

【懸念点】
トレーニング中はレコメンドを取得できない？？








*/ 


const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });
const personalize = new AWS.Personalize();

// const recommenderArn = "arn:aws:personalize:ap-northeast-1:837933661307:recommender/test-most-popular-recommender";
const recommenderArn = "arn:aws:personalize:ap-northeast-1:837933661307:recommender/test-most-popular-recommender-2";
const minRecommendationRequestsPerSecond = 1;

const params = {
  recommenderArn,
  recommenderConfig: {
    minRecommendationRequestsPerSecond,
  },
};

const updateVODRecommender = async () => {
    try {
      const response = await personalize.updateRecommender(params).promise();
      console.log("response=====>", response);
    } catch (err) {
      console.log("error=====>", err, err.stack);
    }
  };
  
  updateVODRecommender();
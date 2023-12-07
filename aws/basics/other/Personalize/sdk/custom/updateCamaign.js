const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const personalize = new AWS.Personalize();
const campaignArn = "arn:aws:personalize:ap-northeast-1:837933661307:campaign/popular-count-campain";
// NOTE: createSolutionVersionのresponseにsolutionVersionArnが含まれている為、こちらを使用する。
const solutionVersionArn = "arn:aws:personalize:ap-northeast-1:837933661307:solution/popular-count/popular-count-evrqbrwtbwtbrwbrtbwr";

const params = {
  campaignArn: campaignArn,
  solutionVersionArn: solutionVersionArn,
};

const updateCampain = async () => {
  try {
    const response = await personalize.updateCampaign(params).promise();
    console.log("Success:", response);
  } catch (err) {
    console.error("Error:", err);
  }
};

updateCampain();

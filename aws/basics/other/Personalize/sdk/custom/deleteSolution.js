const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const personalize = new AWS.Personalize();
const solutionArn = "arn:aws:personalize:ap-northeast-1:837933661307:solution/user-personalization";

const params = {
  solutionArn: solutionArn,
};

const deleteSolution = async () => {
  try {
    const response = await personalize.deleteSolution(params).promise();
    // NOTE: Returns an empty response
    console.log("Success:", response);
  } catch (err) {
    console.error("Error:", err);
  }
};

deleteSolution();

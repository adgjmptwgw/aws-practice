const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const personalize = new AWS.Personalize();
const recipeEnum = {
  SIMILAR_ITEMS: "similar-items",
  PERSONALIZED_RANKING: "personalized-ranking",
  USER_PERSONALIZAION: "user-personalization",
  TRENDING_NOW: "trending-now",
  POPULAR_COUNT: "popular-count",
};
const recipe = recipeEnum.POPULAR_COUNT;
const solutionArn =
  "arn:aws:personalize:ap-northeast-1:837933661307:solution/popular-count";
  
/** ランダムなUUIDを生成します */
const createUUIDId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
      v = a == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const uuid = createUUIDId();
const solutionVersionName = `${recipe}-${uuid}`;

const params = {
  solutionArn: solutionArn,
  trainingMode: "FULL", // トレーニングの範囲を指定します。FULL または UPDATE を指定可能です。
  name: solutionVersionName, // ソリューションバージョン名
};

const createVODRecommender = async () => {
  try {
    const response = await personalize.createSolutionVersion(params).promise();
    console.log("===>response", response);
  } catch (err) {
    console.log("===>error", err);
  }
};

createVODRecommender();


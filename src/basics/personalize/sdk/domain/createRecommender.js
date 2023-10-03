/**
 * ・ドメインのレコメンダーを作成する。レコメンダーを新たに作成すると、最新のデータセットでのレコメンダーが作成される。
 * ・レシピARNが記載されている公式のページ
 * https://docs.aws.amazon.com/ja_jp/personalize/latest/dg/VIDEO_ON_DEMAND-use-cases.html
 */

// TODO: AWS SDK for JavaScript V3 にリファクタリングする

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const personalize = new AWS.Personalize();

const RecipeArnEnum = {
  WATCED_X: "arn:aws:personalize:::recipe/aws-vod-because-you-watched-x",
  MORE_LIKE_X: "arn:aws:personalize:::recipe/aws-vod-more-like-x",
  MOST_POPULAR: "arn:aws:personalize:::recipe/aws-vod-most-popular",
  TRENDING_NOW: "arn:aws:personalize:::recipe/aws-vod-trending-now",
  TOP_PICKS: "arn:aws:personalize:::recipe/aws-vod-top-picks",
};

const params = {
  datasetGroupArn:
    "arn:aws:personalize:ap-northeast-1:837933661307:dataset-group/kusumoto-test-video-on-demand",
  name: "test-recommender",
  recipeArn: RecipeArnEnum.MOST_POPULAR,
};

const createVODRecommender = async () => {
  try {
    const response = await personalize.createRecommender(params).promise();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

createVODRecommender();

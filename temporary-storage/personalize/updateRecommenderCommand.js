import {
  PersonalizeClient,
  UpdateRecommenderCommand,
} from "@aws-sdk/client-personalize";

export const handler = async (event) => {
  const personalizeClient = new PersonalizeClient({
    region: "ap-northeast-1",
  });

  // set the request's parameters
  const updateRecommenderParam = {
    recommenderArn:
      "arn:aws:personalize:ap-northeast-1:837933661307:recommender/test-most-popular-recommender-2",
    //   recommenderConfig: {
    //     trainingDataConfig: {
    //       excludedDatasetColumns: {
    //         "DATASET_TYPE": ["COLUMN_A", "COLUMN_B"]
    //       }
    //     }
    //   }
  };
  console.log(1);

  const run = async () => {
    console.log(2);
    try {
      console.log(3);
      const response = await personalizeClient.send(
        new UpdateRecommenderCommand(updateRecommenderParam)
      );
      console.log(4);
      console.log("Success", response);
      return response; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };
  console.log(1.5);
  run();
  console.log(1.55);
};

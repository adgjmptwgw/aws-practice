import { PersonalizeRuntimeClient, GetRecommendationsCommand } from "@aws-sdk/client-personalize-runtime";

export const handler = async (event) => {
    const config = { region: "ap-northeast-1" };
    const client = new PersonalizeRuntimeClient(config);

    const input = {
        // itemId: "1",
        userId: "1",
        numResults: 10,
        recommenderArn: "arn:aws:personalize:ap-northeast-1:999624277949:recommender/top-picks-for-you-03",
        // filterArn: "STRING_VALUE",
    };

    try {
        const command = new GetRecommendationsCommand(input);
        const response = await client.send(command);
        return response;
    } catch (err) {
        console.error(err);
    }
};


/**
response例
{
    "$metadata": {
      "httpStatusCode": 200,
      "requestId": "3512e58d-dd37-4e08-b174-d4b3edb18492",
      "attempts": 1,
      "totalRetryDelay": 0
    },
    "itemList": [
      {
        "itemId": "1682"
      },
      {
        "itemId": "2858"
      },
      {
        "itemId": "337"
      },
      {
        "itemId": "104"
      },
      {
        "itemId": "1407"
      },
      {
        "itemId": "454"
      },
      {
        "itemId": "8874"
      },
      {
        "itemId": "7361"
      },
      {
        "itemId": "4995"
      },
      {
        "itemId": "500"
      }
    ],
    "recommendationId": "RID-3b-43d0-804e-23cbd70ed114-CID-3dd6cc"
  }

*/


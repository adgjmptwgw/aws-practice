// const AWS = require('aws-sdk');
// const personalize = new AWS.Personalize();

// const DatasetType = {
//   INTERACTIONS: "INTERACTIONS",
//   ITEMS: "ITEMS",
//   USERS: "USERS",
// }

// const ImportMode = {
//   INCREMENTAL: "INCREMENTAL",
//   FULL: "FULL",
// }

// /** ランダムなUUIDを生成します */
// const createUUIDId = () => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
//     let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
//       v = a == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };


// const importCSVtoDataset = async (datasetType) => {
//   const uuid = createUUIDId();
//   const datasetArn = `arn:aws:personalize:ap-northeast-1:999624277949:dataset/updateRecommender/${datasetType}`;
//   // TODO: Luxonを使ってフォルダパスの日付を設定する。
//   const dataLocation = `s3://test-bucket-for-personalize/${datasetType}/2023/7/27`;
//   const jobName = `${datasetType}-${uuid}`;
//   const roleArn = "arn:aws:iam::999624277949:role/service-role/AmazonPersonalize-ExecutionRole-1686624968866";

//   const params = {
//     datasetArn: datasetArn,
//     dataSource: {dataLocation: dataLocation},
//     jobName: jobName,
//     roleArn: roleArn,
//     importMode: ImportMode.FULL,
//   };

//   try {
//     const response = await personalize.createDatasetImportJob(params).promise();
//     console.log("response=====>", response);
//   } catch (error) {
//     console.error('error=====>', error);
//   }
// }

// importCSVtoDataset(DatasetType.INTERACTIONS);


// ========================================================================


import { PersonalizeClient, CreateDatasetImportJobCommand } from "@aws-sdk/client-personalize";
import { DateTime } from 'luxon'

const config = { region: "ap-northeast-1" };
const client = new PersonalizeClient(config);

const DatasetType = {
  INTERACTIONS: "INTERACTIONS",
  ITEMS: "ITEMS",
  USERS: "USERS",
}

const ImportMode = {
  INCREMENTAL: "INCREMENTAL",
  FULL: "FULL",
}

export const handler = async (event) => {
  const datasetType = DatasetType.INTERACTIONS;
  const uuid = createUUIDId();
  const today = DateTime.now().toFormat("yyyy/LL/dd");

  const input = {
    jobName: `${datasetType}-${uuid}`,
    datasetArn: `arn:aws:personalize:ap-northeast-1:999624277949:dataset/updateRecommender/${datasetType}`,
    dataSource: {
      // WARNING: バケットのフォルダ構成を `s3://bucketName/INTERACTIONS/2023/08/01` の様にしてください。
      dataLocation: `s3://バケット名/${datasetType}/${today}`,
    },
    roleArn: "arn:aws:iam::999624277949:role/service-role/AmazonPersonalize-ExecutionRole-1690796393790",
    importMode: ImportMode.INCREMENTAL,
  };
  const command = new CreateDatasetImportJobCommand(input);
  const response = await client.send(command);
  return response;
};

/** ランダムなUUIDを生成します */
const createUUIDId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
      v = a == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
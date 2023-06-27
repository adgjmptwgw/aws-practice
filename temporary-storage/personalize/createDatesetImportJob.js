const AWS = require('aws-sdk');
const personalize = new AWS.Personalize();

// --------------------------------------------
// const s3 = new AWS.S3();

// const searchFiles = async () => {
//   const bucketName = 'kusumoto-test-for-personalize';
//   // const prefix = 'interactions/2023/6/20/interactions';
//   // const prefix = 'items/2023/6/20/items';
//   const prefix = 'users/2023/6/20/users';

//   const params = {
//     Bucket: bucketName,
//     // Prefix: prefix,
//     StartAfter: prefix
//   };
//   const listObjectsResponse = await s3.listObjectsV2(params).promise();
//   const files = listObjectsResponse.Contents.map(
//     (object) => `s3://${bucketName}/${object.Key}`
//   );
//   console.log("🥎", files);
//   return files;
// }


// --------------------------------------------

// async function importCSVtoDataset() {
//   // video on demand
//   const datasetArn = 'arn:aws:personalize:ap-northeast-1:837933661307:dataset/kusumoto-video-on-demand/INTERACTIONS';
//   // const datasetArn = 'arn:aws:personalize:ap-northeast-1:837933661307:dataset/kusumoto-video-on-demand/USERS';
//   // const datasetArn = 'arn:aws:personalize:ap-northeast-1:837933661307:dataset/kusumoto-video-on-demand/ITEMS';
//   const dataLocation = 's3://kusumoto-test-for-personalize/interactions/2023/6/20/';
//   // const dataLocation = 's3://kusumoto-test-for-personalize/users/2023/6/20/';
//   // const dataLocation = 's3://kusumoto-test-for-personalize/items/2023/6/20/';
//   const jobName = 'interactions-job-2';
//   // const jobName = 'users-job-1';
//   // const jobName = 'items-job-1';
//   const roleArn = "arn:aws:iam::837933661307:role/service-role/AmazonPersonalize-ExecutionRole-1686624968866";

//   // custom
//   // const datasetArn = 'arn:aws:personalize:ap-northeast-1:837933661307:dataset/kusumoto-custom-dataset-group/USERS';
//   // const dataLocation = 's3://kusumoto-test-for-personalize/users/2023/6/20/';
//   // const jobName = 'users-cusstom-job-1';
//   // const roleArn = "arn:aws:iam::837933661307:role/service-role/AmazonPersonalize-ExecutionRole-1686624968866";

//   // const importFiles = searchFiles();
//   // console.log("🥎", importFiles);

//   try {
//     const params = {
//       datasetArn: datasetArn,
//       dataSource: {dataLocation: dataLocation},
//       // jobの名前はdataset内でユニークでないといけない
//       jobName: jobName,
//       roleArn: roleArn,
//       importMode: 'INCREMENTAL',
//     };

//     const response = await personalize.createDatasetImportJob(params).promise();

//     console.log("🍙", response);

//   } catch (error) {
//     console.error('Failed to create dataset import job:\n', error);
//   }
// }

// importCSVtoDataset();



/** ランダムなUUIDを生成します */
const createUUIDId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
      v = a == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};


const importCSVtoDataset = async () => {
  const uuid = createUUIDId();
  const datasetArn = 'arn:aws:personalize:ap-northeast-1:837933661307:dataset/kusumoto-video-on-demand/INTERACTIONS';
  const dataLocation = 's3://kusumoto-test-for-personalize/interactions/2023/6/21/';
  const jobName = `interactions-${uuid}`;
  const roleArn = "arn:aws:iam::837933661307:role/service-role/AmazonPersonalize-ExecutionRole-1686624968866";

  const params = {
    datasetArn: datasetArn,
    dataSource: {dataLocation: dataLocation},
    jobName: jobName,
    roleArn: roleArn,
    importMode: 'INCREMENTAL',
  };

  try {
    const response = await personalize.createDatasetImportJob(params).promise();
    console.log("response=====>", response);
  } catch (error) {
    console.error('error=====>', error);
  }
}

importCSVtoDataset();


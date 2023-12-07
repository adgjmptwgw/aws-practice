import {
  PersonalizeEventsClient,
  PutUsersCommand,
} from "@aws-sdk/client-personalize-events";

const config = { region: "ap-northeast-1" };
const client = new PersonalizeEventsClient(config);

// TODO: 性別に「その他」「未設定」があるのか確認が必要
const GenderEnum = {
    MALE: "male",
    FEMALE: "female",
    OHTER: "other"
}
const userProps = {
    GENDER: GenderEnum.MALE,
    AGE: 1
}
const userPropsString = JSON.stringify(userProps);
const input = {
  datasetArn: "STRING_VALUE",
  users: [
    {
      userId: "STRING_VALUE",
      properties: userPropsString,
    },
  ],
};

try {
  const command = new PutUsersCommand(input);
  const response = await client.send(command);
  // 処理が成功した場合、responseは空のobjectを返す
  return response;
} catch (err) {
  console.error(err);
}



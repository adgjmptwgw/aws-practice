// /** ランダムなsessionIdを生成します。uuidと同じ形式です。 */
// const createSessionId = () => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
//     let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
//       v = a == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// const AWS = require("aws-sdk");
// const userId = "1";
// const itemId = "55";
// // const sessionId = createSessionId();
// const sessionId = "04b25408-6ca9-4b31-97ae-b008dbac2c14";
// const timestamp = 1634131498;
// const EVENT_TRACER_ID = "b813fd1c-126e-45d5-9568-fd474f39f0d4";

// const client = new AWS.PersonalizeEvents({
//   region: 'ap-northeast-1'
// });

// const params = {
//   trackingId: EVENT_TRACER_ID,
//   userId: userId,
//   sessionId: sessionId,
//   eventList: [
//     {
//       sentAt: timestamp,
//       eventType: "watch",
//       itemId: itemId,
//     },
//   ],
// };

// const putEventsToDateset = async () => {
//   try {
//     const response = await client.putEvents(params).promise();
//     console.log("🍙", response);
//   } catch (err) {
//     console.log("🐛", err, err.stack);
//   }
// };

// putEventsToDateset();

// ================================================================================================================
// // 全ユーザーにputEvents

// /** ランダムなsessionIdを生成します。uuidと同じ形式です。 */
// const createSessionId = () => {
//     return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
//       let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
//         v = a == "x" ? r : (r & 0x3) | 0x8;
//       return v.toString(16);
//     });
//   };

  const AWS = require("aws-sdk");
  const itemId = "87";
  // const sessionId = createSessionId();
  const sessionId = "04b25408-6ca9-4b31-97ae-b008dbac2c14";
  const timestamp = 1634131498;
  // video on demand
//   const EVENT_TRACER_ID = "b813fd1c-126e-45d5-9568-fd474f39f0d4";
  // custom
  const EVENT_TRACER_ID = "11b3c486-29a5-4883-b388-9534b9521c4e";

  const client = new AWS.PersonalizeEvents({
    region: 'ap-northeast-1'
  });

  const userCount = 100;
  for (let i = 1; i < userCount; i++){
    const params = {
        trackingId: EVENT_TRACER_ID,
        userId: i.toString(),
        sessionId: sessionId,
        eventList: [
          {
            sentAt: timestamp,
            eventType: "watch",
            itemId: itemId,
          },
        ],
      };

      const putEventsToDateset = async () => {
        try {
          const response = await client.putEvents(params).promise();
          console.log("🍙", response);
        } catch (err) {
          console.log("🐛", err, err.stack);
        }
      };

      putEventsToDateset();
  }

// ================================================================================================================
// 全アイテムにputEvents

/** ランダムなsessionIdを生成します。uuidと同じ形式です。 */
// const createSessionId = () => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (a) => {
//     let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
//       v = a == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// const AWS = require("aws-sdk");
// // const sessionId = createSessionId();
// const userId = "2";
// const sessionId = "04b25408-6ca9-4b31-97ae-b008dbac2c14";
// const timestamp = 1634131498;
// const EVENT_TRACER_ID = "b813fd1c-126e-45d5-9568-fd474f39f0d4";

// const client = new AWS.PersonalizeEvents({
//   region: "ap-northeast-1",
// });

// // ADVENTURE 1～40, SF 5～19
// const itemIds = [1, 3, 18, 32, 33, 39, 40, 5, 11, 17, 19];
// for (const itemId of itemIds) {
//     console.log("🍙==========>", itemId.toString());
//     const params = {
//         trackingId: EVENT_TRACER_ID,
//         userId: userId,
//         sessionId: sessionId,
//         eventList: [
//           {
//             sentAt: timestamp,
//             eventType: "watch",
//             itemId: itemId.toString(),
//           },
//         ],
//       };    
//       const putEventsToDateset = async () => {
//         try {
//           const response = await client.putEvents(params).promise();
//           console.log("🍙", response);
//         } catch (err) {
//           console.log("🐛", err, err.stack);
//         }
//       };
    
//       putEventsToDateset();
//   }


# 概要
AWS SDK for JavaScript V3 とは別物であるX-Ray SDKを解説する。  
こちらはEC2にX-Rayデーモンを建てて、デーモン経由でX-Rayにトレースを送信する。

# 手順
## X-Rayデーモンを建てる
おそらく、AWS Batchのコンピューティング環境にタスク（タスク内にX-Rayデーモンコンテナを作成）を作成する。
ECSのタスク定義では下記の様に定義する。  

containerDefinitionsの配列に下記X-Rayデーモンコンテナを定義。
```json
{
    "name": "xray-daemon",
    "image": "amazon/aws-xray-daemon",
    "cpu": 32,
    "memoryReservation": 256,
    "portMappings": [
        {
            "containerPort": 2000,
            "hostPort": 2000,
            "protocol": "udp"
        }
    ],
    "essential": true,
    "environment": [],
    "mountPoints": [],
    "volumesFrom": [],
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
            "awslogs-create-group": "true",
            "awslogs-group": "/ecs/test-task-definition/xray-deamon-log",
            "awslogs-region": "ap-northeast-1",
            "awslogs-stream-prefix": "ecs"
        },
        "secretOptions": []
    }
}
```

## X-Ray SDKをソースに記載する
サポートに問い合わせしたところ、これをECRにPushして、Batchで実行すると、X-Rayトレースが取得できたらしい。　　
こちらは共通化して各AWS Batchで使用する。  
※```AWSXRay.setDaemonAddress``` はFargateであれば不要  

```JavaScript
import  AWSXRay from "aws-xray-sdk";

const rules = {
  rules: [
    {
      description: "X-Ray Test",
      service_name: "*",
      http_method: "*",
      url_path: "*",
      fixed_target: 1,
      rate: 1,
    },
  ],
  default: { fixed_target: 1, rate: 0.1 },
  version: 1,
};

// デフォルトは自動モード
// AWSXRay.enableAutomaticMode();

AWSXRay.setDaemonAddress(
  process.env.AWS_XRAY_DAEMON_ADDRESS || "127.0.0.1:2000"
);

AWSXRay.middleware.setSamplingRules(rules);

const segment = new AWSXRay.Segment("test");
const ns = AWSXRay.getNamespace();

/**
 * バッチ実行エンドポイント
 */
async function testFunction() {
  await ns.run(async function () {
    AWSXRay.setSegment(segment);

    // API等の処理
    console.log("Hello World");

    segment.close();
  });
}

testFunction();
```

## 参考資料
- [AWS公式：X-Ray Node.js SDK Docs](https://docs.aws.amazon.com/xray-sdk-for-nodejs/latest/reference/)
- [AWS公式：X-Ray Node.js SDK](https://docs.aws.amazon.com/ja_jp/xray/latest/devguide/xray-sdk-nodejs-middleware.html)

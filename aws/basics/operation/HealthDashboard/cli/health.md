
# ヘルスダッシュボード

## AWS User Notifications で通知できるサービスを検索する
ヘルスダッシュボードで通知したいサービスをイベントパターンに記載するが、そのサービス名はドキュメントが存在しない為、下記コマンドでいちいち探し出すしかない。  
完全一致したものしか検索できない為、非常に探すのに手間がかかる。

### イベントパターンの ```detail.service``` 内で使用できるサービス名を検索するコマンド
バージニアリージョンで実施する必要がある。

```bash
aws health describe-event-types  --max-results 100 --filter "services=EC2"
```

### User Notificationsのイベントパターン例

```json
{
  "source": [
    "aws.health"
  ],
  "detail-type": [
    "AWS Health Event"
  ],
  "detail": {
    "service": [
      "EC2",
      "ELASTICLOADBALANCING",
      "VPC",
      "ROUTE53"
    ],
    "eventTypeCategory": [
      "issue",
      "scheduledChange",
      "accountNotification"
    ],
    "eventScopeCode": [
      "PUBLIC"
    ]
  }
}
```

### 使用可能なサービス名の例

```txt
EC2
ELASTICLOADBALANCING
VPC
ROUTE53
CLOUDFRONT
S3
RDS
PERSONALIZE
GLUE
QUICKSIGHT
SQS
BATCH
AMPLIFY
APIGATEWAY
LAMBDA
CODEPIPELINE
CODECOMMIT
CODEBUILD
CODEDEPLOY
ECR
ECS
FARGATE
COGNITO
CONFIG
SES
DYNAMODB
IAM
WAF
GUARDDUTY
ACM
INSPECTOR
CLOUDTRAIL
CLOUDWATCH
SNS
BACKUP
EVENTS
ES
SSM
SECRETSMANAGER
HEALTH
NOTIFICATIONS
XRAY
SECURITYHUB
```
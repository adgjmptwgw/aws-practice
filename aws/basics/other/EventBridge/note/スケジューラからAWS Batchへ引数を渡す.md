```
ターゲット
ユニバーサルターゲット
サービス
AWS Batch
API
SubmitJob
ペイロード
{ "JobDefinition": "arn:aws:batch:ap-northeast-1:014534751458:job-definition/dev2-ctvpf-job-definition-notice-entry", "JobName": "dev2-ctvpf-job-notice-entry", "JobQueue": "dev2-ctvpf-job-que-crm", "Parameters": {"noticeId":"test"}, "ContainerOverrides": { "Command": ["node", "./dist/notice/notice-entry/execute.js", "Ref::noticeId"] } }
```

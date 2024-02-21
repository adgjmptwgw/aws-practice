## ターゲットの詳細
### 全てのAPI

サービス：AWS Batch
API：SubmitJob

この例はNest.jsのものなので、dist配下のフォルダを指定する。index.jsはバッチの処理を実行する為の処理が記載されているファイル。  
distフォルダはTypeScriptをJavaScriptにコンパイルした後のアプリ実行用のフォルダ。dockerを起動して、フォルダの中身を確認するとdistフォルダが作成されている。
```json
{ "JobDefinition": "ジョブ定義ARN", "JobName": "任意のジョブ名", "JobQueue": "ジョブキューARN", "Parameters": {"変数名":"値"}, "ContainerOverrides": { "Command": ["node", "./dist/フォルダパス/index.js", "Ref::変数名"] } }
```

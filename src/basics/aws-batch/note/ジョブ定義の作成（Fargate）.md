# 概要
コンソール上で「ジョブ定義の作成」を実施する際の各種項目を解説する。
また、Fargateで構築する場合の手順を記載する。

# 前提知識
## AWS Batchとは
EventBridge等と組み合わせて使用する。AWS Batchは主にジョブの実行を行うもの。  
キューをポーリングしてECSやEC2上のタスク（プログラムの関数コード等）を実行してくれるサービス。  
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/833c5c9b-8eb4-47e8-81c2-962aa1a01861)  

![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/406d1d05-2ab6-4185-8f89-43277dcc1ce9)  


# 手順
## オーケストレーションタイプ

## 全般設定
### ● 実行タイムアウト
AWS Batchのジョブのタイムアウト時間
AWS Batchジョブの処理フローで、`RUNNING`状態でのタイムアウト時間を設定する。　
![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/c4a03c05-8996-4c72-b970-c9d7cabb494f)

### ● スケジュールの優先度
キューの内のジョブの優先度。低い数字のものが優先度が高くなる。

## Fargate プラットフォームの設定
### ● Fargate プラットフォームのバージョン
LinuxプラットフォームのバージョンによってECSの使える機能が異なる。
基本的には`LATEST`で問題ないと思われる。

[**AWS公式: ECSのLinuxプラットフォームバージョン**](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/userguide/platform-linux-fargate.html)

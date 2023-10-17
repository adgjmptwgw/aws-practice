# 概要
コンソール上で「ジョブ定義の作成」を実施する際の各種項目を解説する。
また、Fargateで構築する場合の手順を記載する。

# 前提知識
## AWS Batchとは
EventBridge等と組み合わせて使用する。AWS Batchは主にジョブの実行を行うもの。  
キューをポーリングしてECSやEC2上のタスク（プログラムの関数コード等）を実行してくれるサービス。 

![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/833c5c9b-8eb4-47e8-81c2-962aa1a01861)  

![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/406d1d05-2ab6-4185-8f89-43277dcc1ce9)   

## AWS Batch の具体的な動作イメージ
1. **コンピューティング環境を作成**  
AWS Batchのコンソールで、Fargateの「コンピューティング環境を作成」を実施 => ECSの「クラスター」が作成される。
2. **ジョブ定義の作成**  
AWS Batchのコンソールで、Fargateの「ジョブ定義の作成」を実施 => ECSコンソールの「タスク定義」に新たなタスク定義が作成される。  
3. **ジョブの作成**  
AWS Batchのコンソールで、Fargateの「ジョブの作成」を実施 => ECSで「タスク」が作成されて、実行される。  
実行後、タスクは停止する。

**<参考資料>**  
[**AWS Batch構築の参考資料（入門）**](https://style.potepan.com/articles/32791.html)  

# 手順
---
# コンピューティング環境設定
## サービスロール
AWS Batchの構築を実行すると、AWS Batchが自動的にEC2/ECSのリソースを作成してくれる。そのAWS BatchにEC2/ECSの操作権限を与える。
基本的に`AWSServiceRoleForBatch`を選択する。このロールのPrincipalはAWS Batchで、ActionとしてEC2やECSリソースへのアクセスが割り当てられている。　

**<参考資料>**  
[**AWS公式: AWSServiceRoleForBatchロールについて**](https://docs.aws.amazon.com/ja_jp/batch/latest/userguide/service_IAM_role.html)  

# タスク定義
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
- Linux or WindowsプラットフォームのバージョンによってECSの使える機能が異なる。
- 基本的には`LATEST`で問題ないと思われる。

[**AWS公式: ECSのLinuxプラットフォームバージョン**](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/userguide/platform-linux-fargate.html)

### ● ランタイムプラットフォーム
基本的に`Linux`を選択する。下記の1番に該当する場合のみ、`Windows`を選択する。

WindowsでDockerコンテナを使用するには下記の2種類の方法がある。
1. Windows上で Windows用 のDockerコンテナを動かす
2. Windows上で Linux用 のDockerコンテナを動かす (WindowsのLinux仮想マシンであるWSL2を使用する) 


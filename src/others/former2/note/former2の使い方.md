# 概要
AWSコンソール上にあるリソースをCloudFormationのテンプレートファイルとして、出力できる。  
AWSの公式OSSではないが、AWSにも推奨されている。

## 使い方
- AWSのCredentialsを作成する際は下記のコマンドで生成したものを入力する。※下記はMFA認証をしているアカウントの場合のコマンドです。


<参考資料>  
[使い方](https://zenn.dev/creationup2u/articles/62c2853f01984f)
```aws sts get-session-token --serial-number <IAMロールにある自分のアカウントのMFA.ARNを入力> --profile <AWS Profile Name> --token-code <MFAの6桁の数字であるワンタイム認証コードを入力>```

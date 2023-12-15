# 概要
CloudFront-ALB間のHTTPS接続の手順を解説。

## 前提条件
- ECSのタスクは作成済みで、ALB-ECS間の疎通が確認できている
- ALBの各種設定を確認
  - リスナールール
    - プロトコル:ポートが「HTTPS:443」となっている
    - セキュリティーグループは「CloudFrontのセキュリティーグループからのトラフィックのみを受け入れる」よう設定している。
    - ALBのネットワークマッピング設定で、パブリックサブネットを選択している。

## 手順


# CloudFront → ALB の注意点
CloudFrontで「オリジンドメイン」を選択する際、セレクトボックスでALBのDNSを選択してはいけない。※HTTPで接続する場合はこれでも問題ない。  
ALBのDNSにはSSL/TLS証明書が紐づいていないため、CloudFrontからALB(オリジン)に対してHTTPS接続を行ったとしても接続がうまくいかない。

**<参考資料>**  
- [**CloudFrontとALB間のHTTPS接続の注意点**](https://zenn.dev/devcamp/articles/f488e3d22ff63e)

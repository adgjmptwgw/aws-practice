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
TBD

### CloudFrontにカスタムヘッダーを設定する

### CloudFront → ALB の接続
- ACMにてグローバル用の証明書をリクエストする。
- Route53のホストゾーンにてCloudFrontのディストリビューションをエイリアスとして登録し、Aレコード を作成する。
- AレコードのドメインをCloudFrontの代替ドメインに割り当てる。
- CloudFrontで「オリジンドメイン」を選択する際、セレクトボックスでALBのDNSを選択する。
- ACMにて東京リージョン用の証明書をリクエストする。
- 証明書をALBにアタッチする

**<参考資料>**  
- [**CloudFrontとALB間のHTTPS接続の注意点**](https://zenn.dev/devcamp/articles/f488e3d22ff63e)

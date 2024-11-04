# DHCPオプションセット:Dynamic Host Configuration Protocol
- EC2インスタンスやECS Fargateのタスク等を立ち上げる際に自動的にIPアドレスを割り当ててくれる。
- CIDRのIPアドレス範囲内で設定される。

![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/9d5cff6c-5537-4c0c-b373-d65ea9dbd0b5)

# ACL
- セキュリティーグループとの違いはサブネット単位でトラフィックのインバウンド、アウトバウンドを制御すること 

# VPCエンドポイント
インターネットを介さず他のAWSサービスとプライベート接続できる。  
例えばプライベートサブネットにあるECSからSecrets Managerにアクセスする際はVPCエンドポイントを使うことで、インターネットゲートウェイを介したインターネット通信ではなくプライベートな通信が可能な為、セキュリティーが高まる。  

## PrivateLinkとの違い
下記画像の2つのVPCエンドポイント（接続線を含む）がPrivateLinkのこと。
![image](https://github.com/user-attachments/assets/91fd7be5-8420-4a4e-bd6c-ea4947f207af)


<**参考資料>**  
- [**分かりやすい作成方法の記事**](https://zenn.dev/taiki_asakawa/books/dfc00287d5b8c7/viewer/e092b3)

## タスク定義（サイドカーコンテナ作成）

コンテナ追加
```json
    "containerDefinitions": [
        {
            "name": "app-container",
            "image": "xxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/image-name:tag",
            "cpu": 256,
            "portMappings": [
                {
                    "name": "app-container-3000",
                    "containerPort": 3000,
                    "hostPort": 3000,
                    "protocol": "tcp",
                    "appProtocol": "http"
                }
        },
        // サイドカーコンテナを作成。
        {
            "name": "sleeper",
            "image": "public.ecr.aws/amazonlinux/amazonlinux:2",
            "cpu": 0,
            "portMappings": [],
            "essential": true,
            "command": [
                "sleep",
                "infinity"
            ],
            "environment": [],
            "mountPoints": [],
            "volumesFrom": [],
            "linuxParameters": {
                "initProcessEnabled": true
            },
            "systemControls": []
        }
    ],
```

```pidMode:task```を追加
```json
    "cpu": "256",
    "memory": "512",
    // アプリコンテナのprocessをサイドカーアプリコンテナで閲覧、管理できるようにする設定
    "pidMode": "task",
    "runtimePlatform": {
        "cpuArchitecture": "ARM64",
        "operatingSystemFamily": "LINUX"
    },
```


## サイドカーコンテナに入る
コンテナに入る手順は[**こちら**](https://github.com/adgjmptwgw/infra-note/blob/main/aws/basics/application/ECS/note/%E6%A7%8B%E7%AF%89%E4%BB%A5%E5%A4%96/ECS%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%81%B8%E5%85%A5%E3%82%8B.md)参照

コンテナに入った後の手順

yumを使用する為、aptをインストール
```
apt-get update
apt-get install -y yum
```

サイドカー コンテナー内にいくつかの診断ツールをインストールする
```
yum install procps strace -y
```

プロセス確認
```
ps -aef
```

アプリのprocessをkill
```
kill -9 pidの番号
```


## 参考資料
- [**AWS公式**](https://aws.amazon.com/jp/blogs/news/announcing-additional-linux-controls-for-amazon-ecs-tasks-on-aws-fargate/)
- [**サイドカーコンテナからアプリコンテナのprocess監視する記事**](https://dev.classmethod.jp/articles/ecs-on-fargate-support-shared-pid-namespace/)

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
            ...省略...
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

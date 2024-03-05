# 概要

# 手順
【ECSのコンテナに入る手順】
ECSタスクロールにSSMのFullAccess権限をアタッチ。本来は適切な権限をアタッチしてください。

execコマンドを有効設定確認
```
aws ecs describe-tasks --cluster "cluster-name" --tasks xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx | grep enableExecuteCommand
```

execコマンドを有効化 => タスク強制切替
```
aws ecs update-service --cluster "cluster-name" --service service-name --region ap-northeast-1 --enable-execute-command --force-new-deployment
```

ECSコンテナへ入るコマンド
```
aws ecs execute-command --cluster "cluster-name" --task xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx --container アプリコンテナ名 --interactive --command "/bin/bash"
```

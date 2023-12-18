
### シェルスクリプトの読み込み方
下記の様に相対パスを書くだけ。

```yaml
  build:
    commands:
      - sh ./test.sh
```

## docker build時の注意点

ECS のタスクが起動せず、コンテナログで下記のエラーが出た場合、docker build 時のPCのプラットフォームバージョンとECSタスク定義のプラットフォームバージョンが一致していない可能性がある。
```
exec /usr/local/bin/docker-entrypoint.sh: exec format error
```

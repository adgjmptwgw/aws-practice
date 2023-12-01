# 概要
dockerのcomposeコマンドについて解説する。

# docker composeとは
TBD

# docker compose コマンド
**【compose up コマンド】**
```
docker compose up
```

**【compose up コマンド（よく使われる）】**
docker-compose.yamlファイルの各種サービスをビルドして、バックグラウンドで起動する。
```
docker compose up --build -d
```

d オプションはバックグラウンドでdockerを起動する。その為、dockerコンテナ起動後も通常通り、そのCLIを使用できる。  
フォアグラウンドで起動すると、コンテナを停止しない限り、そのCLIが使えない。
https://qiita.com/Mi_tsu_ya/items/49a5e983f774f1e932e7


# 概要
パッケージ管理

# コマンド

```
apt-get update
```

Dockerファイル等で Python を使用したい場合、下記の様に記載する。※アプリケーションがPythonの場合、aptで取得したPythonをインストールする
```
RUN apt-get update && apt-get install -y \
    python \
```

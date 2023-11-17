# 概要
dockerのビルドコマンドについて解説する。

# docker build とは
[**こちらを参照**]()

# docker build コマンド
**【build コマンド】**
```
docker build -t <タグ名> <実行するDockerfileのフォルダパス>
```

**【build コマンド例】**  
- カレントディレクトリにあるDockerfileから test-image というイメージを作成する。
```
docker build -t test-image .
```

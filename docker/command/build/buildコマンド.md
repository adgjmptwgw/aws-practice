# 概要
dockerのビルドコマンドについて解説する。

# docker build とは
[**こちらを参照**](https://github.com/adgjmptwgw/aws-practice/blob/main/docker/build/note/%E5%9F%BA%E7%A4%8E%E7%9F%A5%E8%AD%98.md)

# docker build コマンド
## 基本
**【build コマンド】**
```
docker build -t <タグ名> <ビルドされるファイル群が存在するフォルダのパス>
```

**【build コマンド例】**  
- カレントディレクトリにある全てのファイル（Dockerfileが含まれている必要あり）で test-image というイメージを作成する。
```
docker build -t test-image .
```

## ファイル指定
**【build ファイルを指定】**
```
docker build -t <タグ名> -f <実行するDockerfileのフォルダパス>
```

```
 docker build -t test-image -f docker/production/Dockerfile
```

# 概要
dockerのビルドコマンドについて解説する。

# docker build とは
[**こちらを参照**](https://github.com/adgjmptwgw/aws-practice/blob/main/docker/build/note/%E5%9F%BA%E7%A4%8E%E7%9F%A5%E8%AD%98.md)

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


**【build コマンド例】**  
- カレントディレクトリにあるDockerfileから test-image というイメージを作成する。
```
docker build -t test-image .
```

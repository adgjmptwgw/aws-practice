【コンテナのprocessを監視、killする】
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

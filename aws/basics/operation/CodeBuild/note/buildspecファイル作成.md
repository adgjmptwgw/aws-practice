
### シェルスクリプトの読み込み方
下記の様に相対パスを書くだけ。

```yaml
  build:
    commands:
      - sh ./test.sh
```

## docker build時の注意点

### エラー
```
exec /usr/local/bin/docker-entrypoint.sh: exec format error
```

**<参考資料>**  
- [**上記トラブル時の対応**](https://qiita.com/OmeletteCurry19/items/fd057a7448aa3072fd1e)
- [**CPU のアーキテクチャを確認するコマンド**](https://zenn.dev/suzuki_hoge/books/2021-12-m1-docker-5ac3fe0b1c05de/viewer/2-arm)

### 解説
PCでbuildする際は、buildしているPCがM1 Macの場合はarm64、Inttel製のMacであればx86_64である。これはECSタスク定義のプラットフォームバージョンと一致している必要がある。  
その為、CodeBuildのbuildspecファイルで```docker build```を実行させる際は、

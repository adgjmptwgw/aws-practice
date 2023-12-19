
### シェルスクリプトの読み込み方
下記の様に相対パスを書くだけ。

```yaml
  build:
    commands:
      - sh ./test.sh
```

## docker build時の注意点
ECSのタスクが下記のエラーで立ち上がらない事がある。このエラーは「ECSのタスク定義のCPUプラットフォームバージョン」と「dockerビルド時のCPUプラットフォームバージョン」が違う為に発生している。  

### エラー
```
exec /usr/local/bin/docker-entrypoint.sh: exec format error
```

**<参考資料>**  
- [**上記トラブル時の対応**](https://qiita.com/OmeletteCurry19/items/fd057a7448aa3072fd1e)
- [**CPU のアーキテクチャを確認するコマンド**](https://zenn.dev/suzuki_hoge/books/2021-12-m1-docker-5ac3fe0b1c05de/viewer/2-arm)

### 解説
PCでbuildする際は、buildしているPCがM1 Macの場合はarm64、Inttel製のMacであればx86_64である。これはECSタスク定義のプラットフォームバージョンと一致している必要がある。  
その為、CodeBuildのbuildspecファイルで```docker build```を実行させる際は、下記の様なビルドコマンドを実施する。
また、ビルドしたいCPUのプラットフォームバージョンやnodejsのバージョン次第で、CodeBuildのオペレーティングシステム（Amazon Linux, Ubuntu）とイメージ設定を変更する必要がある。  

**【ビルドコマンド】**  
```
# arm64
docker build --platform linux/arm64 --no-cache -t $REPO_NAME .

# x86_64
docker build --platform linux/x86_64 --no-cache -t $REPO_NAME .

# amd64
docker build --platform linux/amd64 --no-cache -t $REPO_NAME .
```

**【OSのイメージ設定例】**  
NodeJS ランタイム18 を ECS の arm64 で動作させたい場合は、「Amazon Linux 2 AArch64 standard:3.0」を選択する。
※AArch64 は arm64 の事


**<参考資料>**  
- [**AWS公式：言語のランタイムに対応するOSのイメージ設定やCPUプラットーフォームバージョンについて**](https://docs.aws.amazon.com/ja_jp/codebuild/latest/userguide/available-runtimes.html)


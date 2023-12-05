# 概要
CodeCommitでHTTPS（GRC）接続する為の手順を記載する。

# 手順
## 前提
- gitをインストール済み
- aws cliをインストール済み
- CodeCommitへアクセスできる権限を持つユーザーにて実施（aws configureでアクセスキーを保管するaws credentials, その他設定のconfig情報は登録済み）

## git-remote-codecommitインストール準備
git-remote-codecommitをインストールするにはpipが必要なため、pipをインストールする。

1. pipとpythonがインストールされているか確認
※pipをインストールする為にpythonをインストールする必要があるため。

```
python -V
```
```
pip -V
```

2.  pythonがインストールされてない場合はインストール
3.  pipもインストールしていない場合、インストール

## AWS認証情報を登録しているか確認
登録している場合は問題なし。awsのprofileを確認する。

## CodeCommitにHTTP（GRC）接続を行う
```
git clone codecommit://AWSアカウントのプロフィール名@レポジトリ名
```

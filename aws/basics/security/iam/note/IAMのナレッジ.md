# 概要
IAMに関するナレッジをまとめる。  

# ロール
## AWS STS（AWS Security Token Service）
- AWSサービスに対して何かしら操作したい時に、一時的に操作する権利(Token)を発行する。

![image](https://github.com/adgjmptwgw/aws-practice/assets/66456130/0842a47e-ff0a-410d-a58a-d46595cab4bc)

## AssumeRole
- STS の一機能である
- IAMロールに設定した権限を一時的に使えるようにTokenを発行する。
- 使用例
  - AssumeRoleすると、別アカウントのサービスに一時的にアクセスする事ができるようにする
  - IAMロール内にあるIAMポリシーの操作を行えるようにする

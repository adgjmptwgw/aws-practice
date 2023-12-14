# 概要
TBD

# 手順
1. ターゲットグループを作成  
- Blue用、Green用のものをそれぞれ作成。ターゲットのポートは当然2つとも同じにする。
2. ALBを作成  
- Blue用、Green用のリスナーをそれぞれ作成
- リスナーのポートはHTTP通信の場合、例として80（Blueのターゲットグループへ転送用）と8080（Greenのターゲットグループへ転送用）の様に設定する。
3. 
4. ECSを作成
- デプロイオプションでBlue/Greenデプロイを設定

# ナレッジ

## Amazon ECS CodeDeploy IAM ロール
- ECSのサービス作成画面にて、「デプロイオプション > ブルー/グリーンデプロイ > CodeDeploy のサービスロール」で使用するロール。
- 新たにIAMロールを作成し、```AWSCodeDeployRoleForECS```ポリシーをそのロールに割り当て、ECSのサービス作成画面で使用する。

**<参考資料>**  
- [**AWS公式：Amazon ECS CodeDeploy IAM ロール**](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/codedeploy_IAM_role.html)

<details>
    <summary>**AWSCodeDeployRoleForECSポリシーの内容**</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "ecs:DescribeServices",
                "ecs:CreateTaskSet",
                "ecs:UpdateServicePrimaryTaskSet",
                "ecs:DeleteTaskSet",
                "elasticloadbalancing:DescribeTargetGroups",
                "elasticloadbalancing:DescribeListeners",
                "elasticloadbalancing:ModifyListener",
                "elasticloadbalancing:DescribeRules",
                "elasticloadbalancing:ModifyRule",
                "lambda:InvokeFunction",
                "cloudwatch:DescribeAlarms",
                "sns:Publish",
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "iam:PassRole"
            ],
            "Effect": "Allow",
            "Resource": "*",
            "Condition": {
                "StringLike": {
                    "iam:PassedToService": [
                        "ecs-tasks.amazonaws.com"
                    ]
                }
            }
        }
    ]
}
```
</details>


## テストリスナーとは

**<参考資料>**  
- [**テストリスナーについて分かる資料**](https://iselegant.hatenablog.com/entry/2021/10/12/225617)

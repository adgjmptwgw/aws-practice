# 概要
CodeCommitにソースをPush => CodeBuildでECRにDockerfileをPush => CodeDeployでBlue/Greenデプロイ の流れをCodePipelineにて作成する。  
これらの構築についてまとめる。



**<参考資料>**  
- [**CodeDeployでECSにBlue/Greenデプロイする**](https://tomiko0404.hatenablog.com/entry/2021/10/10/CodePipeline-ECS-BlueGreenDeployment)
- [**CodeDeployでECSにBlue/Greenデプロイする記事**](https://dev.classmethod.jp/articles/codepipeline-ecs-codedeploy/)

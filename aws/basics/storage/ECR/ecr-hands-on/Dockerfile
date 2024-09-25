# "Hello World" の文字列を表示するだけのサンプルアプリ
# ECRにデプロイして、ECSで起動する際のテスト用として使用する

# =======================< port=80 >=================================
FROM ubuntu:18.04
 
# Install dependencies
RUN apt-get update && \
    apt-get -y install apache2
 
# Install apache and write hello world message
RUN echo 'Hello World 80!' > /var/www/html/index.html
 
# Configure apache
RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
    echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
    echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \
    echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \
    chmod 755 /root/run_apache.sh
 
# Dockerコンテナのポートを指定
EXPOSE 80
 
CMD /root/run_apache.sh


# 【パブリックサブネットにECS】
# aws ecs create-service \
# --service-name ecs-service-1 \
# --cluster h4b-ecs-cluster \
# --task-definition h4b-ecs-task-definition:12 \
# --desired-count 1 \
# --launch-type FARGATE \
# --network-configuration 'awsvpcConfiguration={subnets=[subnet-01d8a57ab8b9f192d, subnet-0f5ce8a65cb46b015],securityGroups=[sg-0307aceef4b132169],assignPublicIp=ENABLED}' \
# --load-balancers '[{"targetGroupArn": "arn:aws:elasticloadbalancing:ap-northeast-1:999624277949:targetgroup/h4b-ecs-target-group-80/9cc6071675b10bee", "containerName": "apache-helloworld", "containerPort": 80},{"targetGroupArn": "arn:aws:elasticloadbalancing:ap-northeast-1:999624277949:targetgroup/h4b-ecs-target-group-8080/1854175026bda713", "containerName": "apache-helloworld-2", "containerPort": 8080}]'


# 【プライベートサブネットにECS】
# aws ecs create-service \
# --service-name ecs-service-1 \
# --cluster h4b-ecs-cluster \
# --task-definition h4b-ecs-task-definition:12 \
# --desired-count 1 \
# --launch-type FARGATE \
# --network-configuration 'awsvpcConfiguration={subnets=[subnet-021266f238b86e215, subnet-0ea287637986f555a],securityGroups=[sg-0307aceef4b132169],assignPublicIp=ENABLED}' \
# --load-balancers '[{"targetGroupArn": "arn:aws:elasticloadbalancing:ap-northeast-1:999624277949:targetgroup/h4b-ecs-target-group-80/9cc6071675b10bee", "containerName": "apache-helloworld", "containerPort": 80},{"targetGroupArn": "arn:aws:elasticloadbalancing:ap-northeast-1:999624277949:targetgroup/h4b-ecs-target-group-8080/1854175026bda713", "containerName": "apache-helloworld-2", "containerPort": 8080}]'


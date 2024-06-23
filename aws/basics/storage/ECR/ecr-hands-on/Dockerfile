# =======================< port=80 >=================================
# コンテナポート番号80で起動させる場合
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

# =======================< port=8080 >===============================
# コンテナポート番号8080で起動させる場合

# FROM ubuntu:18.04
 
# # Install dependencies
# RUN apt-get update && \
#     apt-get -y install apache2
 
# # Install apache and write hello world message
# # alb、ecsのdnsに /test8080 を付けると、'Hello World 8080!' が表示されます
# RUN mkdir /var/www/html/test8080/
# RUN echo 'Hello World 8080!' > /var/www/html/test8080/index.html
 
# # Configure apache
# RUN echo '. /etc/apache2/envvars' > /root/run_apache.sh && \
#     echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
#     echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \
#     # 'sed -i "s/hoge/foo/g" 対象のファイル名' コマンドで対象ファイル内の文字列 hoge を foo に置換する
#     # Ubuntu の Apahche ディレクトリ構成で /etc/apache2/ports.conf ファイルにある Listenのポート番号を変更する
#     # /root/run_apache.sh は bashのシェルで、Apacheを起動するコマンド。起動前に左側のコマンドを起動する事を意味する。
#     echo 'sed -i "s/Listen 80/Listen 8080/g" /etc/apache2/ports.conf' >> /root/run_apache.sh && \
#     echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \
#     chmod 755 /root/run_apache.sh
 
# # Dockerコンテナのポートを指定
# EXPOSE 8080
 
# CMD /root/run_apache.sh

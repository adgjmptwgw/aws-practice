# 【npmパッケージ用】
# docker run --rm -p 80:80 npm-stoplight/prism

# 【prismイメージ用】
# docker run --rm -it -p 4010:4010 -v $PWD:/tmp stoplight/prism:4 mock -h 0.0.0.0 /tmp/api.yml -d

# 【curlコマンド】
# curl "http://127.0.0.1:80/pets"
# curl -X 'POST' 'http://127.0.0.1:80/pets' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{ "name":"kusumoto", "tag": "test" }'

# ====================================================================================================================================
# api.ymlの内容を取り込んでbuildする必要がある? ビルドコンテキストを使うと、build時に他のファイルを取り込んでくれる。

FROM node:16
# これ以降のコマンドは全てWORKDIRで指定したディレクトリで実行される
WORKDIR /app
RUN npm install -g @stoplight/prism-cli
# ホストマシン側のカレントディレクトリの「全て」のファイル => WORKDIRである /app ディレクトリ下にコピーする
COPY . .

CMD ["prism", "mock", "/app/api.yml", "-h", "0.0.0.0", "-p", "80"]

EXPOSE 80
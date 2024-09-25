# 【npmパッケージ用】
# docker run --rm -p 80:80 npm-stoplight/prism

# 【prismイメージ用】
# docker run --rm -it -p 4010:4010 -v $PWD:/tmp stoplight/prism:4 mock -h 0.0.0.0 /tmp/open-api.yaml -d

# 【curlコマンド】
# curl "http://127.0.0.1:80/pets"
# curl -X 'POST' 'http://127.0.0.1:80/pets' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{ "name":"kusumoto", "tag": "test" }'

# ====================================================================================================================================
# 1. docker buildでモックサーバーを建てる
# 2. curlコマンドでOpenAPIのyamlファイルで定義したAPIを実行すると、モックサーバーからレスポンスが返ってくる
# ※ 当然ECSにデプロイしてモックサーバーを建てる事も可能

FROM node:16
# これ以降のコマンドは全てWORKDIRで指定したディレクトリで実行される
WORKDIR /app
RUN npm install -g @stoplight/prism-cli
# ホストマシン側のカレントディレクトリの「全て」のファイル => WORKDIRである /app ディレクトリ下にコピーする
COPY . /app

# NOTE: "open-api.yaml"の部分は任意のファイル名。このDockerfileと同じファイルパスで、モックとして起動したいOpenAIのファイルを配置する。
CMD ["prism", "mock", "/app/open-api.yaml", "-h", "0.0.0.0", "-p", "80"]

EXPOSE 80
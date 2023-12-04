# 概要
docker image build時に利用する変数のデフォルト値

下記の様にbuild時に値を書き換える事ができる変数。
```
docker build ./ --build-arg hoge=hello
```

```dockerfile
ARG hoge
RUN echo $hoge
```

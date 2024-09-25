const endpoints = {
  // TODO: 不要となればtest用のAPIは削除してください
  test: {
    name: "テスト",
    method: "GET",
    url: "/test",
  },
  login: {
    name: "ログイン",
    method: "POST",
    url: "/login",
  },
  getUser: {
    name: "ユーザー一覧を取得",
    method: "GET",
    url: "/user",
  },
  getUserById: {
    name: "ユーザーを取得",
    method: "GET",
    url: "/user/{id}",
  },
};

export default endpoints;

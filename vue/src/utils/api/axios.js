import axios from "axios";
import _ from "lodash";
import { userStore } from "@/stores/user";
/** src/config.{環境名}.js ファイルからインポート。vite.configを参照。 */
import { API_BASE_URL, TOKEN_TYPE } from "app-configs";
import endpoints from "@/constants/api-endpoints";

// NOTE: axiosのデフォルトURLを設定。API_BASE_URL を "example.com" に設定する事で、 axios.get(example.com/api) を　axios.get(api) だけで呼び出せるようになる。
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

/** リクエストを送信する前に実施する処理 */
axios.interceptors.request.use(
  (request) => {
    const user = userStore();
    if (user.isLoggedIn) {
      request.headers.Authorization = `${TOKEN_TYPE} ${user.loginUserInfo.accessToken}`;
    }

    return request;
  },
  (error) => {
    return error;
  }
);

/** リクエストを送信後に実施する処理 */
axios.interceptors.response.use(
  (response) => {
    const user = userStore();
    // TODO: 動作確認未実施
    if (response.headers.jwt) {
      const accessToken = response.headers.jwt;
      user.setUserInfo({ accessToken: accessToken });
    }
    return response;
  },
  (error) => {
    // TODO: 共通のエラーハンドリングを実装する。動作確認未実施。
    if (
      error.response?.status === 401 &&
      error.config.url !== axios.getEndpoint("login").url
    ) {
      console.error("Unauthenticated user.");
      // TODO: ログアウト処理を実装
    }

    return error;
  }
);

/** API名, HTTPメソッド, pathの情報を取得する */
axios.getEndpoint = (name, routeParams) => {
  const routeObject = endpoints[name];

  if (!routeObject) {
    console.error(`${name} APIは存在しません`);
    return null;
  }

  // NOTE: API定義元のオブジェクトを破壊しないようにディープコピーする。
  const _ro = _.cloneDeep(routeObject);
  _ro.apiName = name;

  /** "/user/{id}"のパスがある場合、{id}部分にidの文字列を投入する */
  if (routeParams !== undefined && typeof routeParams === "object") {
    let url = _ro.url;
    for (const key in routeParams) {
      const param = routeParams[key];
      const regex = new RegExp(`{${key}}`, "g");
      url = url.replace(regex, param);
    }
    _ro.url = url;
  }

  return _ro;
};

export default axios;

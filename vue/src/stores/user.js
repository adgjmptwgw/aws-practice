import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const userStore = defineStore(
  "user",
  () => {
    // ====================< state >====================
    const loginUserInfo = reactive({
      /** ログインしているかどうか判定する為のフラグ */
      isLoggedIn: false,
      accessToken: "",
      refreshToken: "",
      // TODO: 使用するかどうか不明だが、念の為保管している。使用しない場合削除してください。
      user: {
        userId: "",
        email: "",
        role: "",
      },
    });

    // ====================< getters >====================

    // ====================< actions >====================
    const setUserInfo = (userInfoObject) => {
      const { isLoggedIn, accessToken, refreshToken, user } = userInfoObject;
      if (isLoggedIn) loginUserInfo.isLoggedIn = isLoggedIn;
      if (accessToken) loginUserInfo.accessToken = accessToken;
      if (refreshToken) loginUserInfo.refreshToken = refreshToken;
      if (user) loginUserInfo.user = user;
    };

    return {
      loginUserInfo,
      setUserInfo,
    };
  },
  {
    // NOTE: trueにすると、ステートのデータはページを更新しても永続化される。基本はfalseとする。
    persist: true,
  }
);

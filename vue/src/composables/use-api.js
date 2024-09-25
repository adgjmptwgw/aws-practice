import {
  submitResultMessage,
  SUBMIT_RESULT,
  API_ACTION,
} from "@/utils/submit-status-message";
import { reactive, toRefs } from "vue";

export const useApi = (apiFunction, httpMethod) => {
  const state = reactive({
    loading: false,
    errors: null,
  });
  

  const handleApi = async () => {
    state.loading = true;

    return await apiFunction()
      .then((apiResponse) => {
        state.errors = null;

        /** データが1件も存在しなかった場合、メッセージを表示 */
        if (apiResponse.data.length === 0) {
          submitResultMessage(SUBMIT_RESULT.WARN, API_ACTION[httpMethod]);
        }
        return apiResponse;
      })
      .catch((error) => {
        // TODO: 下記の処理は使用するかは未定。下記の様な加工をせず、errorオブジェクトをそのまま返しても問題はない。
        state.errors = {
          message: error.response?.data?.message,
          status: error.response?.status || 500,
          reason: error.response?.data,
        };
        /** 送信失敗メッセージを表示する */
        submitResultMessage(SUBMIT_RESULT.ERROR, API_ACTION[httpMethod]);
        return null;
      })
      .finally(() => {
        state.loading = false;
      });
  };

  return {
    handleApi,
    // NOTE: reactiveをrefに変換する
    ...toRefs(state),
  };
};

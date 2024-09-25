/** 各種フォーム送信結果のステータスのEnum */
export const SUBMIT_RESULT = {
  SUCCESS: "success",
  WARN: "warning",
  ERROR: "error",
};
/** メッセージに使用するHTTPメソッドのEnum */
export const API_ACTION = {
  GET: "取得",
  POST: "登録",
  PUT: "更新",
  PATCH: "更新",
  DELETE: "削除",
};

/**
 * フォーム送信結果に応じたメッセージを表示する関数
 *
 * @param {string} status - 送信結果のステータス
 * @param {string} action - API動作内容 (例: "取得", "登録", "更新", "削除")
 * @returns {void}
 */
export const submitResultMessage = (status, action) => {
  if (!action) {
    console.error("ElMessageコンポーネント表示エラー");
    return null;
  }

  // ステータスごとのメッセージ
  const messageObject = {
    [SUBMIT_RESULT.SUCCESS]: `データの${action}に成功しました`,
    [SUBMIT_RESULT.WARN]: `該当する${action}データはありませんでした。`,
    [SUBMIT_RESULT.ERROR]: `データの${action}に失敗しました`,
  };

  const message = messageObject[status] || null;

  if (message) {
    ElMessage({
      message: message,
      type: status,
    });
  } else {
    console.error("ElMessageコンポーネント表示エラー");
  }
};

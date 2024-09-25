/**
 * バリデーションのエラーメッセージが含まれているオブジェクトから、エラーメッセージを1つの文字列をして取得します。最終的にバリデーションメッセージとして表示します。
 * @param {object} validateObj - vuelidateライブラリのバリデーションオブジェクト
 * @returns {string} - 出力例： "入力必須です | 数値を入力してください | 5文字以上で入力してください"
 */
export const getValidMessage = (validateObj) => {
  try {
    /** errorMessageArray変数の例: ["入力必須です", "数値を入力してください", "5文字以上で入力してください"] */
    const errorMessageArray = validateObj?.$errors.map((e) => e.$message) || [];
    if (errorMessageArray.length === 0) {
      return "";
    } else {
      return errorMessageArray.join(" | ");
    }
  } catch (error) {
    console.error("バリデーションメッセージ取得処理が失敗しました:", error);
    return "";
  }
};

import * as validators from "@vuelidate/validators";
import { createI18n } from "vue-i18n";

// NOTE: この処理を使用する事で、バリデーションメッセージを日本語化できる。
export const i18n = createI18n({
  legacy: false,
  locale: "ja",
  fallbackLocale: "ja",
  messages: {
    ja: {
      //   NOTE: もし追加したいバリデーション項目があれば、こちらにも追加する。
      validations: {
        required: "入力必須です",
        numeric: "数値を入力してください",
        minLength: "{min}文字以上で入力してください",
        maxLength: "{max}文字以内で入力してください",
      },
    },
  },
});

const { createI18nMessage } = validators;

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

/** ========================================================================
【概要】
こちらに追加する事でカスタムバリデーションを作成する事ができる。

【解説】
- "withI18nMessage()" の引数には "validators.required" の様に、バリデーションライブラリの Vuelidate にサポートされているバリデーションを記載する。
- "withArguments: true" にすると、明示的に引数を有効にする。例えば maxLength の場合、 'validations.maxLength: "{max}文字までです。"' の様にバリデーションメッセージに文字列を注入できる。
========================================================================*/

/** 入力必須 */
export const required = withI18nMessage(validators.required);
/** 数値のみ許可 */
export const numeric = withI18nMessage(validators.numeric);
/** 文字数制限（最小） */
export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true,
});
/** 文字数制限（最大） */
export const maxLength = withI18nMessage(validators.maxLength, {
  withArguments: true,
});

// WARINING: 実装途中
const verifyPasswordRegex = (value) => {
  // パスワードの正規表現: 最低8文字以上で、英数字を最低1つ以上含む
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 正規表現にマッチするか確認
  if (regex.test(value)) {
    // 有効なパスワード
    return true;
  } else {
    // 無効なパスワード
    return false;
  }
};
export const verifyPassword = withI18nMessage(verifyPasswordRegex);

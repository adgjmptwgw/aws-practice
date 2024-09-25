<template>
  <el-card body-style="width: 100%;" class="w-50">
    <!-- 検索セクション -->
    <div class="mb-5">
      <el-text class="fs-4 fw-bold">ログイン</el-text>
    </div>
    <!-- フォーム -->
    <el-form
      status-icon
      class="row w-100"
      label-width="auto"
      label-position="left"
      :model="formValues"
    >
      <!-- 各種フォーム -->
      <el-form-item
        prop="mailAdress"
        class="w-100 d-flex flex-column"
        :error="getValidMessage(v$['mailAdress'])"
      >
        <template #label>
          <el-text>メールアドレス</el-text>
          <span class="text-danger">*</span>
        </template>
        <el-input
          type="email"
          placeholder="info@example.com"
          clearable
          size="large"
          v-model="formValues.mailAdress"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        class="w-100 d-flex flex-column"
        :error="getValidMessage(v$['password'])"
      >
        <template #label>
          <el-text>パスワード</el-text>
          <span class="text-danger">*</span>
        </template>
        <el-input
          type="password"
          placeholder="password"
          size="large"
          show-password
          v-model="formValues.password"
        />
      </el-form-item>
      <!-- フォーム送信ボタン -->
      <div class="d-flex justify-content-end mt-3">
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm()"
            :disabled="isEnableButton"
          >
            送信
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { required, minLength } from "@/utils/validation/i18n-validators";
import { useVuelidate } from "@vuelidate/core";
import { getValidMessage } from "@/utils/validation/get-valid-message";

const router = useRouter();
/** バリデーションルール */
const rules = {
  mailAdress: { required },
  password: { required, minLength: minLength(8) },
};

/** フォームの入力値 */
const formValues = reactive({
  mailAdress: "",
  password: "",
});

/** バリデーションを実行する為に必要な変数（第一引数：バリデーションルール、第二引数：フォームのステート） */
const v$ = useVuelidate(rules, formValues);

const submitForm = async (formValues) => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    console.log("バリデーションエラー");
  } else {
    console.log("リクエスト送信");
    // TODO: 認証処理を実装する
    router.push({ path: "/" });
  }
};
</script>

<style scoped></style>

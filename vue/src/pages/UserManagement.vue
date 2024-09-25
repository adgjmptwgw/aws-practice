<!--【タブ5】ユーザー管理 -->
<template>
  <section>
    <div class="mb-3">
      <el-text class="fs-5">検索キーワード</el-text>
    </div>
    <!-- フォーム -->
    <el-form
      status-icon
      class="row"
      label-width="auto"
      label-position="left"
      ref="searchConditionRef"
      :model="searchCondition"
    >
      <!-- 各種フォーム -->
      <el-form-item
        label="ログインID"
        prop="loginId"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['loginId'])"
        ><el-input clearable="true" v-model="searchCondition.loginId"
      /></el-form-item>
      <el-form-item
        label="名前"
        prop="userName"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['userName'])"
        ><el-input clearable="true" v-model="searchCondition.name"
      /></el-form-item>
      <el-form-item
        label="拠点会社名"
        prop="companyName"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['companyName'])"
      >
        <el-select v-model="searchCondition.company" placeholder="">
          <el-option
            v-for="company in companies"
            :value="company.name"
            :key="company.id"
            :label="company.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="d-flex justify-content-end mt-3">
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(searchConditionRef)"
          :disabled="isEnableButton"
        >
          検索
        </el-button>
        <el-button @click="resetForm(searchConditionRef)">クリア</el-button>
      </el-form-item>
    </div>
  </section>
  <!-- ユーザー一覧セクション -->
  <section>
    <div>
      <el-text class="fs-5">ユーザー一覧</el-text>
      <div class="d-flex justify-content-end mt-3">
        <el-button type="primary" @click="regist">
          <!-- TODO: ユーザー登録の作成 -->
          新規登録
        </el-button>
      </div>
      <div class="mb-2">
        <!-- TODO: ページネーションの最大数と同じ数を表示できるようにする -->
        <el-text class="fs-8">対象のデータ : {{ pagination?.total }}件</el-text>
      </div>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="ロード中"
      empty-text="データがありません"
      class="mb-4"
      :data="tableData"
    >
      <el-table-column prop="loginId" label="ログインID" />
      <el-table-column prop="userName" label="名前" />
      <el-table-column prop="companyName" label="拠点会社名" />
      <el-table-column prop="control" label="操作" width="120">
        <template #default="scope">
          <el-button
            class="btn-sm btn btn-transparent"
            :icon="Edit"
            @click="edit(scope.row)"
          >
            <!-- TODO:削除ダイアログの作成 -->
          </el-button>
          <el-button
            class="btn-sm btn btn-transparent"
            :icon="Delete"
            @click="switchVisbleDeleteDialog(true)"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="userLock" label="ユーザーロック" width="100" />
    </el-table>
    <!-- ページネーション -->
    <div>
      <el-pagination
        layout="prev, pager, next"
        background
        :total="pagination.total"
        :pager-count="pagination.per_page"
        :current-page="pagination.page"
        @current-change="
          (currentPage) => {
            changeCurrentPage(currentPage);
            fetchAndSetData();
          }
        "
      />
    </div>
    <EditUserDialog
      :is-visible-dialog="isVisibleDialog"
      :selected-row-data="selectdTableRowData"
      @close-dialog="switchVisbleDialog"
    />
  </section>
  <!-- 削除確認ダイアログ -->
  <el-dialog v-model="isVisibleDeleteDialog" width="400">
    <el-text>削除します。よろしいですか？</el-text>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="switchVisbleDeleteDialog(false)"
          >はい</el-button
        >
        <el-button @click="switchVisbleDeleteDialog(false)"
          >キャンセル</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { Delete } from "@element-plus/icons-vue";
import { Edit } from "@element-plus/icons-vue";
import { getValidMessage } from "@/utils/validation/get-valid-message";
import { useModal } from "@/composables/use-modal";
import { usePagination } from "@/composables/use-pagination";
import { useApi } from "@/composables/use-api";
import axios from "@/utils/api/axios";
import { usersResponse, companyResponse, getDammyData } from "../dammy-data";
// TODO: ダミーデータの為、DBからデータを取得できるようになれば削除する

/** テーブルに表示する全テーブルデータ */
const tableData = ref([]);
/** クリックしたテーブル列のデータ */
const selectdTableRowData = ref();
/** ElementUIにて使用できるリセットフォーム等の機能が使用できるようになる。 */
const searchConditionRef = ref();

const companies = companyResponse.data;

/** バリデーションルール */
const rules = {
  loginId: {},
  name: {},
  company: {},
};

/** フォームの入力値 */
const searchCondition = reactive({
  loginId: "",
  name: "",
  companyName: "",
});
/** バリデーションを実行する為に必要な変数（第一引数：バリデーションルール、第二引数：フォームのステート） */
const v$ = useVuelidate(rules, searchCondition);

/** モーダルの表示状態の管理、モーダルの表示切替を管理する */
const { isVisibleDialog, switchVisbleDialog } = useModal();
const {
  isVisibleDialog: isVisibleDeleteDialog,
  switchVisbleDialog: switchVisbleDeleteDialog,
} = useModal();

/** テーブルの状態管理、テーブルの操作を行う */
const { pagination, changeCurrentPage, changeTotalItems } = usePagination();

/** フォームデータとページネーションのパラメータをマージしたリクエストパラメータを作成 */
const requestParams = computed(() => {
  return {
    ...searchCondition,
    ...{ perPage: pagination.perPage, page: pagination.page },
  };
});
/** フォーム送信ボタンを押下し、API通信が完了するまで（ローディング中）非活性にする */
const isEnableButton = computed(() => loading.value);

const api = axios.getEndpoint("test");
const { handleApi, loading, error } = useApi(async () => {
  // return await axios(api);
  // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
  return getDammyData(usersResponse);
}, api.method);

// TODO: 特定のユーザーを取得する際のAPI処理の例。あくまで例として記載している為、APIの実装が始まると不要になる為、削除して下さい。
// ======================================================================================================================
// const userId = 1;
// const api = axios.getEndpoint("getUserById", { userId });
// const { handleApi, loading, error } = useApi(async () => {
//   return await axios(api);
// }, api.method);
// ======================================================================================================================

/** DBからデータを取得して、レスポンスをステートにセットする */
const fetchAndSetData = async () => {
  const response = await handleApi();

  tableData.value = response.data;
  changeTotalItems(response.pagination.total);
};

/** 検索ボタン押下で、DBからデータを取得する */
const submitForm = async (formValues) => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    console.log("バリデーションエラー");
  } else {
    console.log("リクエスト送信");
    await fetchAndSetData();
  }
};
const edit = (row) => {
  selectdTableRowData.value = row;
  switchVisbleDialog(true);
};

const regist = () => {
  let row = {
    loginId: "",
    userName: "",
    companyName: "",
  };
  selectdTableRowData.value = row;
  switchVisbleDialog(true);
};

/** フォームの入力内容をリセット */
const resetForm = (formValues) => formValues && formValues.resetFields();
</script>

<style scoped></style>

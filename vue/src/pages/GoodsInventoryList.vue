<!--【タブ1】商品在庫管理一覧ページ -->
<template>
  <!-- 検索セクション -->
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
        label="商品名"
        prop="productName"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['productName'])"
      >
        <el-input v-model="searchCondition.productName" />
      </el-form-item>
      <el-form-item
        label="商品番号"
        prop="goodsNumber"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['goodsNumber'])"
      >
        <el-input v-model="searchCondition.goodsNumber" />
      </el-form-item>
      <el-form-item
        label="店舗名"
        prop="storeName"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['storeName'])"
      >
        <el-select
          v-loading="fetchStoreListLoading"
          v-model="searchCondition.stores"
          value-key="id"
          placeholder=""
        >
          <el-option
            v-for="item in stores"
            :value="item.name"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="最新ステータス"
        prop="lendingStatus"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['lendingStatus'])"
      >
        <el-select
          v-model="searchCondition.lendingStatus"
          value-key="id"
          placeholder=""
        >
          <el-option
            v-for="s in status"
            :value="s.name"
            :label="s.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <div class="d-flex justify-content-end mt-3">
        <el-form-item>
          <!-- フォーム送信ボタン -->
          <el-button
            type="primary"
            @click="submitForm(searchConditionRef)"
            :disabled="isDisabledButton"
          >
            検索
          </el-button>
          <!-- フォームリセットボタン -->
          <el-button @click="resetForm(searchConditionRef)">クリア</el-button>
        </el-form-item>
      </div>
    </el-form>
  </section>

  <!-- 商品在庫管理一覧セクション -->
  <section>
    <div class="mb-3">
      <el-text class="fs-5">商品在庫管理一覧</el-text>
    </div>
    <div class="mb-2">
      <el-text class="fs-8">対象のデータ : {{ pagination?.total }}件</el-text>
    </div>
    <div class="mb-1 d-flex flex-row-reverse me-5">
      <el-button
        type="primary"
        :disabled="isDisabledExportCsv"
        @click="exportCsv"
      >
        CSV出力
      </el-button>
    </div>
    <!-- 検索結果表示用テーブル -->
    <el-table
      v-loading="fetchGoodsInventoryListLoading"
      element-loading-text="ロード中"
      empty-text="データがありません"
      class="mb-4"
      :data="tableData"
      @row-click="handleTableRowClick"
    >
      <el-table-column prop="productName" label="商品名" />
      <el-table-column prop="goodsNumber" label="備品番号" />
      <el-table-column prop="storeName" label="店舗名" />
      <el-table-column prop="lendingStatus" label="最新ステータス">
        <template #default="scope">
          <el-text>{{ LENDING_STATUS[scope.row.lendingStatus] }}</el-text>
        </template>
      </el-table-column>
    </el-table>

    <!-- ページネーション -->
    <div>
      <el-pagination
        layout="prev, pager, next"
        background
        :total="pagination.total"
        :pager-count="pagination.perPage"
        :current-page="pagination.page"
        @current-change="
          (currentPage) => {
            changeCurrentPage(currentPage);
            fetchAndSetData();
          }
        "
      />
    </div>

    <!-- テーブル列クリック時のモーダルウィンドウ -->
    <GoodsInventoryDetailDialog
      :is-visible-dialog="isVisibleDialog"
      :selected-row-data="selectdTableRowData"
      @close-dialog="switchVisbleDialog"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  numeric,
} from "@/utils/validation/i18n-validators";
import { getValidMessage } from "@/utils/validation/get-valid-message";
// TODO: ダミーデータの為、DBからデータを取得できるようになれば削除する
import {
  equipmentPlansResponse,
  status,
  storeResponse,
  getDammyData,
} from "@/dammy-data";
import { useApi } from "@/composables/use-api";
import { useModal } from "@/composables/use-modal";
import { usePagination } from "@/composables/use-pagination";
import axios from "@/utils/api/axios";
import { LENDING_STATUS } from "@/constants/lending-status";

/** テーブルに表示する全テーブルデータ */
const tableData = ref([]);
/** クリックしたテーブル列のデータ */
const selectdTableRowData = ref();
/** ElementUIにて使用できるリセットフォーム等の機能が使用できるようになる。 */
const searchConditionRef = ref();

/** バリデーションルール */
const rules = {
  // TODO: 下記は記載例だが、後で削除する
  // goodsNumber: { required, numeric, minLength: minLength(3) },
  goodsNumber: {},
  productName: {},
  lendingStatus: {},
  storeName: {},
  stores: {},
};

/** フォームの入力値 */
const searchCondition = reactive({
  goodsNumber: "",
  productName: "",
  lendingStatus: "",
  storeName: "",
  stores: "",
});
/** バリデーションを実行する為に必要な変数（第一引数：バリデーションルール、第二引数：フォームのステート） */
const v$ = useVuelidate(rules, searchCondition);
/** モーダルの表示状態の管理、モーダルの表示切替を管理する */
const { isVisibleDialog, switchVisbleDialog } = useModal();
/** 商品在庫管理一覧テーブルのページネーションの状態や操作を行う */
const { pagination, changeCurrentPage, changeTotalItems } = usePagination();

/** フォームデータとページネーションのパラメータをマージしたリクエストパラメータを作成 */
const requestParams = computed(() => {
  return {
    ...searchCondition,
    ...{
      perPage: pagination.perPage,
      page: pagination.page,
    },
  };
});
/** フォーム送信ボタンを押下し、API通信が完了するまで（ローディング中）非活性にする */
const isDisabledButton = computed(() => fetchGoodsInventoryListLoading.value);

/** テーブルデータが空であれば、CSVエクスポートボタンを非活性にする */
const isDisabledExportCsv = computed(() =>
  tableData.value.length === 0 ? true : false
);

onMounted(async () => {
  await fetchStoreListApi();
});

const useGoodsInventoryListApi = (apiFunction, httpMethod) =>
  useApi(apiFunction, httpMethod);
const useStoreListApi = (apiFunction, httpMethod) =>
  useApi(apiFunction, httpMethod);

const goodsInventoryListApi = axios.getEndpoint("test");
const {
  handleApi: fetchGoodsInventoryListApi,
  loading: fetchGoodsInventoryListLoading,
  error: fetchGoodsInventoryListError,
} = useGoodsInventoryListApi(async () => {
  // return await axios(api);
  // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
  return getDammyData(equipmentPlansResponse);
}, goodsInventoryListApi.method);

const storeListApi = axios.getEndpoint("test");
const {
  handleApi: fetchStoreListApi,
  loading: fetchStoreListLoading,
  error: fetchStoreListError,
} = useStoreListApi(async () => {
  // return await axios(api);
  // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
  return getDammyData(storeResponse);
}, storeListApi.method);

/** DBからデータを取得して、レスポンスをステートにセットする */
const fetchAndSetData = async () => {
  // Fetch Data
  const response = await fetchGoodsInventoryListApi();
  // Set data
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

    /** DBからデータを取得 */
    await fetchAndSetData();
  }
};

/** フォームの入力内容をリセット */
const resetForm = (formValues) => formValues && formValues.resetFields();

const handleTableRowClick = async (row, column, event) => {
  selectdTableRowData.value = row;
  switchVisbleDialog(true);
};

const exportCsv = () => {
  // 検索結果CSV出力
};
</script>

<style scoped></style>

<!--【タブ2】出荷情報一覧ページ -->
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
        label="出荷情報ID"
        prop="shippingInfoId"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['shippingInfoId'])"
      >
        <el-input clearable="true" v-model="searchCondition.shippingInfoId" />
      </el-form-item>
      <el-form-item
        label="伝票番号"
        prop="voucherNumber"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['voucherNumber'])"
      >
        <el-input clearable="true" v-model="searchCondition.voucherNumber" />
      </el-form-item>
      <el-form-item
        label="イベント名"
        prop="eventName"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['eventName'])"
      >
        <el-input clearable="true" v-model="searchCondition.eventName" />
      </el-form-item>
      <el-form-item
        label="出荷元"
        prop="shipFrom"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['shipFrom'])"
      >
        <el-input clearable="true" v-model="searchCondition.shipFrom" />
      </el-form-item>
      <el-form-item
        label="納品先"
        prop="shipTo"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['shipTo'])"
      >
        <el-input clearable="true" v-model="searchCondition.shipTo" />
      </el-form-item>
      <el-form-item
        label="出荷日時"
        prop="deliveredDate"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['deliveredDate'])"
      >
        <el-date-picker
          v-model="searchCondition.deliveredDateFrom"
          format="YYYY/MM/DD HH:mm"
          clearable="true"
          type="datetime"
          class="w-25"
        /><label>~</label>
        <el-date-picker
          v-model="searchCondition.deliveredDateTo"
          format="YYYY/MM/DD HH:mm"
          clearable="true"
          type="datetime"
          class="w-25"
        />
      </el-form-item>
      <el-form-item
        label="納品日時"
        prop="stockedDate"
        class="w-50 d-flex flex-column"
        :error="getValidMessage(v$['stockedDate'])"
      >
        <el-date-picker
          v-model="searchCondition.stockedDateFrom"
          format="YYYY/MM/DD HH:mm"
          clearable="true"
          type="datetime"
          class="w-25"
        /><label>~</label>
        <el-date-picker
          v-model="searchCondition.stockedDateTo"
          format="YYYY/MM/DD HH:mm"
          clearable="true"
          type="datetime"
          class="w-25"
        />
      </el-form-item>
      <div class="d-flex justify-content-end mt-3">
        <el-form-item>
          <!-- フォーム送信ボタン -->
          <el-button
            type="primary"
            @click="submitForm(searchConditionRef)"
            :disabled="loading"
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
      <el-text class="fs-5">出荷情報一覧</el-text>
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
      v-loading="loading"
      empty-text="データがありません"
      class="mb-4 mt-3"
      :data="tableData"
      @row-click="handleTableRowClick"
    >
      <el-table-column prop="shippingInfoId" label="出荷情報ID" />
      <el-table-column prop="voucherNumber" label="伝票番号" />
      <el-table-column prop="eventName" label="イベント名" />
      <el-table-column prop="shipFrom" label="出荷元" />
      <el-table-column prop="shipTo" label="納品先" />
      <el-table-column prop="deliveredDate" label="出荷日時">
        <template #default="scope">
          <el-text>
            {{ dayjs(scope.row.deliveredDate).format("YYYY/MM/DD HH:mm") }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column prop="stockedDate" label="納品日時">
        <template #default="scope">
          <el-text>
            {{ dayjs(scope.row.stockedDate).format("YYYY/MM/DD HH:mm") }}
          </el-text>
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
  </section>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  numeric,
} from "@/utils/validation/i18n-validators";
import { getValidMessage } from "@/utils/validation/get-valid-message";
// TODO: ダミーデータの為、DBからデータを取得できるようになれば削除する
import { shippingInfoList, getDammyData } from "@/dammy-data";
import { useApi } from "@/composables/use-api";
import { usePagination } from "@/composables/use-pagination";
import axios from "@/utils/api/axios";

const router = useRouter();
/** テーブルに表示する全テーブルデータ */
const tableData = ref([]);
/** ElementUIにて使用できるリセットフォーム等の機能が使用できるようになる。 */
const searchConditionRef = ref();

/** バリデーションルール */
const rules = {
  // TODO: 下記は記載例だが、後で削除する
  // shippingInfoId: { required, numeric, minLength: minLength(3) },
  shippingInfoId: {},
  voucherNumber: {},
  eventName: {},
  shipFrom: {},
  shipTo: {},
  deliveredDate: {},
  stockedDate: {},
};

/** フォームの入力値 */
const searchCondition = reactive({
  shippingInfoId: "",
  voucherNumber: "",
  eventName: "",
  shipFrom: "",
  shipTo: "",
  deliveredDate: "",
  stockedDate: "",
});
/** バリデーションを実行する為に必要な変数（第一引数：バリデーションルール、第二引数：フォームのステート） */
const v$ = useVuelidate(rules, searchCondition);

/** テーブルの状態管理、テーブルの操作を行う */
const { pagination, changeCurrentPage, changeTotalItems } = usePagination();

/** テーブルデータが空であれば、CSVエクスポートボタンを非活性にする */
const isDisabledExportCsv = computed(() =>
  tableData.value.length === 0 ? true : false
);

/** フォームデータとページネーションのパラメータをマージしたリクエストパラメータを作成 */
const requestParams = computed(() => {
  return {
    ...searchCondition,
    ...{ perPage: pagination.perPage, page: pagination.page },
  };
});

const api = axios.getEndpoint("test");
const { handleApi, loading, error } = useApi(async () => {
  // return await axios.get(api);
  // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
  return getDammyData(shippingInfoList);
}, api.method);

/** APIの実行と取得したパラメータを各ステートにセット */
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

/** フォームの入力内容をリセット */
const resetForm = (formValues) => formValues && formValues.resetFields();

const handleTableRowClick = async (row, column, event) => {
  router.push({
    path: "/scheduled-arrival-result",
    query: {
      productName: row.productName,
      scheduledArrivalQuantity: row.scheduledArrivalQuantity,
      resultArrivalQuantity: row.resultArrivalQuantity,
      shippingInfoId: row.shippingInfoId,
      voucherNumber: row.voucherNumber,
      eventName: row.eventName,
      shipFrom: row.shipFrom,
      shipTo: row.shipTo,
      deliveredDate: row.deliveredDate,
      stockedDate: row.stockedDate,
    },
  });
};
</script>

<style scoped></style>

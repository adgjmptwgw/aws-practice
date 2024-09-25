<template>
  <el-dialog v-model="props.isVisibleDialog" @close="closeDialog" width="80%">
    <!-- セクション １ -->
    <section class="mb-5">
      <!-- タイトル 1 -->
      <el-text class="fs-3">備品詳細</el-text>
      <!-- コンテンツ 1 -->
      <el-form
        status-icon
        class="row mt-3"
        label-width="auto"
        label-position="left"
      >
        <el-form-item label="商品ID" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            props.selectedRowData?.goodsId || "-"
          }}</el-text>
        </el-form-item>

        <el-form-item label="タグID" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            props.selectedRowData?.tagId || "-"
          }}</el-text>
        </el-form-item>

        <el-form-item label="商品名" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            props.selectedRowData?.productName || "-"
          }}</el-text>
        </el-form-item>

        <el-form-item label="店舗名" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            props.selectedRowData?.storeName || "-"
          }}</el-text>
        </el-form-item>

        <el-form-item label="ステータス" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            LENDING_STATUS[props.selectedRowData.lendingStatus] || "-"
          }}</el-text>
        </el-form-item>

        <el-form-item label="拠点会社" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            props.selectedRowData?.company || "-"
          }}</el-text>
        </el-form-item>
        <el-form-item label="登録日時" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            dayjs(props.selectedRowData?.createdAt).format(
              "YYYY/MM/DD HH:mm"
            ) || "-"
          }}</el-text>
        </el-form-item>
        <el-form-item label="更新日時" class="w-50 d-flex flex-column">
          <el-text line-clamp="2" class="w-50">{{
            dayjs(props.selectedRowData?.updatedAt).format(
              "YYYY/MM/DD HH:mm"
            ) || "-"
          }}</el-text>
        </el-form-item>
      </el-form>
    </section>

    <!-- セクション 2 -->
    <section class="mb-5">
      <!-- タイトル 2 -->
      <div class="mb-3">
        <el-text class="fs-3">出荷情報一覧</el-text>
      </div>
      <div class="mb-2">
        <el-text class="fs-8"
          >対象のデータ : {{ shippingInfoPagination?.total }}件</el-text
        >
      </div>
      <!-- テーブル -->
      <el-table
        v-loading="shippingInfoLoading"
        empty-text="データがありません"
        class="mb-4 mt-3"
        :data="shippingInfoData"
      >
        <el-table-column prop="shippingInfoId" label="出荷情報ID" />
        <el-table-column prop="shipFrom" label="出荷元" />
        <el-table-column prop="shipTo" label="納品先" />
        <el-table-column prop="deliveredDate" label="納品日時">
          <template #default="scope">
            <el-text>
              {{ dayjs(scope.row.deliveredDate).format("YYYY/MM/DD HH:mm") }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="lendingStatus" label="最終ステータス">
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
          :total="shippingInfoPagination.total"
          :pager-count="shippingInfoPagination.perPage"
          :current-page="shippingInfoPagination.page"
          @current-change="
            (currentPage) => {
              shippingInfoChangePage(currentPage);
              fetchShippingInfoAndSet(goodsId);
            }
          "
        />
      </div>
    </section>

    <!-- セクション 3 -->
    <section class="mb-5">
      <!-- タイトル 3 -->
      <div class="mb-3">
        <el-text class="fs-3">貸出履歴一覧</el-text>
      </div>
      <!-- コンテンツ 3 -->
      <div class="mb-2">
        <el-text class="fs-8"
          >対象のデータ : {{ lendingHistoriesPagination?.total }}件</el-text
        >
      </div>
      <!-- テーブル -->
      <el-table
        v-loading="lendingHistoryLoading"
        element-loading-text="ロード中"
        empty-text="データがありません"
        class="mb-4 mt-3"
        :data="lendingHistoris"
      >
        <el-table-column prop="goodsId" label="商品ID" />
        <el-table-column prop="storeName" label="店舗名" />
        <el-table-column prop="partEmployeeId" label="従業員ID" />
        <el-table-column prop="deliveredDate" label="貸出日時">
          <template #default="scope">
            <el-text>
              {{ dayjs(scope.row.deliveredDate).format("YYYY/MM/DD HH:mm") }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="returnDate" label="返却日時">
          <template #default="scope">
            <el-text>
              {{
                scope.row.returnDate
                  ? dayjs(scope.row.returnDate).format("YYYY/MM/DD HH:mm")
                  : ""
              }}
            </el-text>
          </template>
        </el-table-column>
      </el-table>

      <!-- ページネーション -->
      <div>
        <el-pagination
          layout="prev, pager, next"
          background
          :total="lendingHistoriesPagination.total"
          :pager-count="lendingHistoriesPagination.perPage"
          :current-page="lendingHistoriesPagination.page"
          @current-change="
            (currentPage) => {
              lendingHistoriesChangePage(currentPage);
              fetchLendingHistoriesAndSet(goodsId);
            }
          "
        />
      </div>
    </section>

    <!-- ダイアログフッター部 -->
    <template #footer>
      <div class="d-flex justify-content-end">
        <el-button @click="closeDialog">閉じる</el-button>
        <el-button type="primary" @click="closeDialog">更新</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, watch } from "vue";
import dayjs from "dayjs";
import { LENDING_STATUS } from "@/constants/lending-status";
import { usePagination } from "@/composables/use-pagination";
import { useApi } from "@/composables/use-api";
import axios from "@/utils/api/axios";
import {
  shippingInfoList,
  equipmentPlansResponse,
  getDammyData,
} from "@/dammy-data";

const props = defineProps({
  isVisibleDialog: {
    type: Boolean,
    required: true,
  },
  selectedRowData: {
    type: Object,
    required: true,
  },
});

/** APIのパラメータとして送信する出庫ID */
const goodsId = ref("");
/** 出荷情報履歴データ */
const shippingInfoData = ref([]);
/** 備品履歴データ */
const lendingHistoris = ref([]);

const useShippingInfoPagination = () => usePagination();
const useLendingHistoriesPagination = () => usePagination();

const {
  pagination: shippingInfoPagination,
  changeCurrentPage: shippingInfoChangePage,
  changeTotalItems: shippingInfoChangeTotal,
} = useShippingInfoPagination();
/** 備品履歴一覧テーブルのページネーションの状態や操作を行う */
const {
  pagination: lendingHistoriesPagination,
  changeCurrentPage: lendingHistoriesChangePage,
  changeTotalItems: lendingHistoriesChangeTotal,
} = useLendingHistoriesPagination();

const useShippingInfoListApi = (apiFunction, httpMethod) =>
  useApi(apiFunction, httpMethod);
const useLendingHistoriesApi = (apiFunction, httpMethod) =>
  useApi(apiFunction, httpMethod);

/** 出荷情報履歴を取得するAPI */
const shippingInfoApi = axios.getEndpoint("test");
const { handleApi: fetchShippingInfoList, loading: shippingInfoLoading } =
  useShippingInfoListApi(async () => {
    // return await axios(shippingInfoApi);
    // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
    return getDammyData(shippingInfoList);
  }, "shippingInfoApi.method");

/** 備品履歴を取得するAPI */
const lendingHistoriesApi = axios.getEndpoint("test");
const { handleApi: fetchLendingHistories, loading: lendingHistoryLoading } =
  useLendingHistoriesApi(async () => {
    // return await axios(lendingHistoriesApi);
    // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
    return getDammyData(equipmentPlansResponse);
  }, lendingHistoriesApi.method);

/** テーブルに表示するデータを事前にソートする */
const sortByDeriverdDate = (array, sortTarget) =>
  array?.sort((a, b) => new Date(a[sortTarget]) - new Date(b[sortTarget])) ||
  [];

const emit = defineEmits(["close-dialog"]);
const closeDialog = () => {
  emit("close-dialog", false);
};

/** APIを実行し、そのレスポンスを各種ステートにセットする */
const fetchShippingInfoAndSet = async (goodsId) => {
  // TODO: goodsId のパラメータを用いてAPIを呼び出す
  const response = await fetchShippingInfoList();
  if (response) {
    // APIにて取得したデータを出荷情報一覧テーブル表示用のステートにセットする
    shippingInfoData.value = sortByDeriverdDate(response.data, "deliveredDate");
    /** APIにて取得したページネーションデータをステートに設定する */
    shippingInfoChangeTotal(response.pagination.total);
  }
};

/** APIを実行し、そのレスポンスを各種ステートにセットする */
const fetchLendingHistoriesAndSet = async (goodsId) => {
  // TODO: goodsId のパラメータを用いてAPIを呼び出す
  const response = await fetchLendingHistories();
  if (response) {
    // APIにて取得したデータを貸出履歴一覧テーブル表示用のステートにセットする
    lendingHistoris.value = sortByDeriverdDate(response.data, "createdAt");
    /** APIにて取得したページネーションデータをステートに設定する */
    lendingHistoriesChangeTotal(response.pagination.total);
  }
};

/** 商品在庫管理一覧テーブルにて列を押下すると発火する。商品IDに紐づくデータを取得するAPIを実行。 */
watch(
  () => props.selectedRowData,
  async (newValue) => {
    /** 商品在庫管理一覧テーブルから選択した列の商品IDを取得 */
    goodsId.value = newValue.goodsId;
    await Promise.all([
      fetchShippingInfoAndSet(),
      fetchLendingHistoriesAndSet(),
    ]);
  }
);
</script>

<style scoped></style>

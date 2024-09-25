<template>
  <!-- セクション 1 -->
  <section class="mb-5">
    <!-- タイトル 1 -->
    <div class="mb-3">
      <el-text class="fs-5">入荷予定実績詳細</el-text>
    </div>
    <!-- フォーム -->
    <el-form
      status-icon
      class="row mt-3"
      label-width="auto"
      label-position="left"
    >
      <el-form-item label="出荷情報ID" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.shippingInfoId || "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="伝票番号" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.voucherNumber || "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="イベント名" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.eventName || "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="出荷元" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.shipFrom || "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="納品先" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.shipTo || "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="出荷日時" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          dayjs(selectedRowData?.deliveredDate).format("YYYY/MM/DD HH:mm") ||
          "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="納品日時" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          dayjs(selectedRowData?.stockedDate).format("YYYY/MM/DD HH:mm")
        }}</el-text>
      </el-form-item>
    </el-form>
  </section>

  <!-- セクション 2 -->
  <section>
    <!-- タイトル 2 -->
    <div class="mb-3">
      <el-text class="fs-5">入荷予定実績</el-text>
    </div>
    <div class="mb-2">
      <el-text class="fs-8">対象のデータ : {{ pagination?.total }}件</el-text>
    </div>
    <!-- 検索結果表示用テーブル -->
    <el-table
      v-loading="loading"
      element-loading-text="ロード中"
      empty-text="データがありません"
      class="mb-4 mt-3"
      :data="tableData"
      @row-click="handleTableRowClick"
    >
      <el-table-column prop="productName" label="商品名" />
      <el-table-column prop="scheduledArrivalQuantity" label="入荷予定数" />
      <el-table-column prop="resultArrivalQuantity" label="入荷実績数" />
      <el-table-column prop="quantityDiff" label="差分">
        <template #default="scope">
          <el-text
            v-if="Number(scope.row.quantityDiff) >= 0"
            type="success"
            class="fs-5"
            ><i class="bi bi-check2-circle"></i
          ></el-text>
          <el-text v-else type="danger" class="fw-bold fs-6">{{
            scope.row.quantityDiff
          }}</el-text>
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
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";
import axios from "@/utils/api/axios";
import { scheduledArrivalResultResponse, getDammyData } from "@/dammy-data";
import { useApi } from "@/composables/use-api";
import { usePagination } from "@/composables/use-pagination";

const router = useRouter();
const route = useRoute();
/**  前回のページにて選択したテーブル列のデータ */
const selectedRowData = route.query;

/** テーブルに表示する全テーブルデータ */
const tableData = ref([]);

/** テーブルの状態管理、テーブルの操作を行う */
const { pagination, changeCurrentPage, changeTotalItems } = usePagination();

/** 入荷予定実績データを取得するAPIを実行 */
const api = axios.getEndpoint("test");
const { handleApi, loading, error } = useApi(async () => {
  // return await axios.get(api);
  // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
  return getDammyData(scheduledArrivalResultResponse);
}, api.method);

onMounted(async () => {
  await fetchAndSetData();
});

const fetchAndSetData = async () => {
  const response = await handleApi();
  tableData.value = response.data;
  changeTotalItems(response.pagination.total);
};

const handleTableRowClick = (row) => {
  router.push({
    path: "/warehousing-result-detail",
    query: {
      productName: row.productName,
      scheduledArrivalQuantity: row.scheduledArrivalQuantity,
      resultArrivalQuantity: row.resultArrivalQuantity,
    },
  });
};
</script>

<style scoped></style>

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
      <el-form-item label="商品名" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.productName || "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="入荷予定数" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.scheduledArrivalQuantity || "-"
        }}</el-text>
      </el-form-item>
      <el-form-item label="入荷実績数" class="w-50 d-flex flex-column">
        <el-text line-clamp="2" class="w-50">{{
          selectedRowData?.resultArrivalQuantity || "-"
        }}</el-text>
      </el-form-item>
    </el-form>
  </section>

  <!-- セクション 2 -->
  <section>
    <!-- タイトル -->
    <div class="mb-3">
      <el-text class="fs-5">入出荷予定実績詳細</el-text>
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
    >
      <el-table-column prop="lendingId" label="備品ID" />
      <el-table-column prop="isReadingCode" label="読取実績">
        <template #default="scope">
          <el-text
            type="success"
            class="fs-5 fw-bold"
            v-if="scope.row.isReadingCode === true"
            >〇</el-text
          >
          <el-text type="danger" class="fs-5 fw-bold" v-else>✖</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="未入荷理由">
        <template #default="scope">
          {{ scope.row.reason || "-" }}
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
import { useRoute } from "vue-router";
import axios from "@/utils/api/axios";
import { warehousingResultDetail, getDammyData } from "@/dammy-data";
import { useApi } from "@/composables/use-api";
import { usePagination } from "@/composables/use-pagination";

const route = useRoute();
/**  前回のページにて選択したテーブル列のデータ */
const selectedRowData = route.query;

/** テーブルに表示する全テーブルデータ */
const tableData = ref([]);

/** テーブルの状態管理、テーブルの操作を行う */
const { pagination, changeCurrentPage, changeTotalItems } = usePagination();

/** 入出荷予定実績詳細データを取得するAPIを実行 */
const api = axios.getEndpoint("test");
const { handleApi, loading, error } = useApi(async () => {
  // return await axios.get(api);
  // TODO: 本処理はAPIが実装されるまでの仮実装の為、最終的には上記の様なaxiosのAPI処理をこちらへ記載する。
  return getDammyData(warehousingResultDetail);
}, api.method);

onMounted(async () => {
  await fetchAndSetData();
});

const fetchAndSetData = async () => {
  const response = await handleApi();
  tableData.value = response.data;
  changeTotalItems(response.pagination.total);
};
</script>

<style scoped></style>

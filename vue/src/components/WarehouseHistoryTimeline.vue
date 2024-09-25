<!-- NOTE: 本ファイルは貸出履歴のタイムラインです。使用されていないですが、念のため残しています。 -->

<template>
  <el-dialog v-model="props.isVisibleDialog" @close="closeDialog">
    <!-- タイトル -->
    <template #title>
      <el-text class="fs-4">備品使用履歴</el-text>
    </template>
    <!-- サブタイトル -->
    <el-text class="fs-6">
      備品ID :
      {{ sortedData?.[0]?.lendingId || "備品IDが取得できません" }}
    </el-text>

    <!-- タイムライン -->
    <el-timeline class="w-75 mt-5">
      <el-timeline-item
        v-for="(item, index) in sortedData"
        :timestamp="dayjs(item.deliverdDate).format('YYYY/MM/DD HH:mm')"
        :size="isLastIndex(sortedData, index) ? 'large' : 'normal'"
        :type="isLastIndex(sortedData, index) ? 'primary' : ''"
        :hollow="isLastIndex(sortedData, index)"
        placement="top"
      >
        <el-card :class="isLastIndex(sortedData, index) ? 'latest-status' : ''">
          <h4 class="mb-4">{{ LENDING_STATUS[item.lendingStatus] }}</h4>
          <p>所在地 : {{ item.currentLocation }}</p>
          <p>操作スタッフID : {{ item.userId }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <!-- ダイアログフッター部 -->
    <template #footer>
      <div>
        <el-button @click="closeDialog">閉じる</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, defineProps } from "vue";
import dayjs from "dayjs";
import { LENDING_STATUS } from "@/constants/lending-status";

const props = defineProps({
  isVisibleDialog: {
    type: Boolean,
    required: true,
  },
  equipmentHistoryData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close-dialog"]);
const closeDialog = () => {
  emit("close-dialog", false);
};
/** 入出庫履歴は出庫日時順に表示する為、昇順でソートする */
const sortedData = computed(() => {
  return props.equipmentHistoryData.sort(
    (a, b) => new Date(a.deliverdDate) - new Date(b.deliverdDate)
  );
});
/** 配列の要素が一番最後のものはtrueを返す。入出庫履歴データの最新データかどうか判定する際に使用する。 */
const isLastIndex = (array, index) => {
  const lastIndex = array.length - 1;
  return lastIndex === index ? true : false;
};
</script>

<style scoped>
.latest-status {
  border-radius: 4px;
  border: solid 2px #409eff;
  background-color: #f9ffff;
}
</style>

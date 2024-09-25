<template>
  <el-menu class="h-100">
    <el-menu-item v-for="item in menuByRole">
      <!-- 各種サイドバー -->
      <router-link
        v-if="item.routePath"
        :to="item.routePath"
        class="custom-link w-100"
      >
        <!-- アイコン -->
        <span class="m-1" v-if="item.icon"><i :class="item.icon"></i></span>
        <!-- サイドバー各種タイトル -->
        <el-text class="m-1 sidebar-title" v-if="item.title">{{
          item.title
        }}</el-text>
      </router-link>
    </el-menu-item>
    <!-- ログアウト専用タブ -->
    <el-menu-item>
      <!-- TODO: ログアウト用のパスを設定する -->
      <router-link to="/test" class="custom-link w-100">
        <span class="m-1"><i class="bi bi-box-arrow-right"></i></span>
        <span class="m-1">ログアウト</span>
      </router-link>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  /** サイドバーメニュー（ユーザーロールにより、表示される内容が異なる） */
  menuByRole: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* サイドバーのリンク */
.custom-link {
  color: #606266;
  text-decoration: none; /* 下線を削除 */
  cursor: default; /* 通常のカーソルにする */
}

.router-link-active {
  color: #409eff;
}
</style>

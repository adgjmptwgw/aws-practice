<template>
  <div class="w-100 h-100">
    <el-container class="row h-100 p-1">
      <!-- NOTE: ログイン画面以外はこちらが描画される -->
      <div v-if="$route.path !== '/login'">
        <!-- ヘッダー -->
        <Header />
        <!-- メイン -->
        <el-main class="main">
          <!-- サイドバー -->
          <div class="sidebar">
            <SideBar :menu-by-Role="menuByRole" />
          </div>
          <!-- メインコンテンツ -->
          <div class="main-content">
            <!-- NOTE: Vue Router にて、対象のViewコンポーネントがここへレンダリングされる -->
            <router-view />
          </div>
        </el-main>
      </div>
      <!-- NOTE: ログイン画面はこちらが描画される -->
      <div v-else class="login-main">
        <router-view />
      </div>
    </el-container>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";
import menu from "@/constants/menu-route.js";
import ROLE from "@/constants/user-role.js";

/** NOTE: サイドバーメニュー（ユーザーロールにより、表示される内容が異なる） */
const menuByRole = ref([]);

onMounted(() => {
  // TODO: DBから取得したロールIDを入れる
  const role = ROLE[1];
  menuByRole.value = menu[role];
});
</script>

<style scoped>
/* メイン領域（サイドバー + コンテンツ） */
.main {
  width: 100%;
  height: 90%;
  display: flex;
  padding: 0.5rem;
}

/* サイドバー全体領域 */
.sidebar {
  width: 13%;
}

/* メインコンテンツ全体領域（サイドバーを除く） */
.main-content {
  width: 87%;
  padding: 2rem;
}

/* メイン領域（サイドバー + コンテンツ） */
.login-main {
  width: 100%;
  height: auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

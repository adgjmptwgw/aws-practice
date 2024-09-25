<template>
  <el-header
    class="header shadow-sm bg-body-tertiary rounded p-3 d-flex align-items-center"
  >
    <!-- ヘッダー左端 -->
    <el-row class="w-100 h-100">
      <el-col
        :span="12"
        class="d-flex justify-content-start align-items-center"
      >
        <el-image src="src/assets/images/vitejs.svg" class="logo" />
      </el-col>
      <!-- ヘッダー右端 -->
      <el-col :span="12" class="d-flex justify-content-end align-items-center">
        <div>
          <i class="bi bi-person"></i>
          <el-text class="m-3" size="large">管理者ユーザー</el-text>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup></script>

<style scoped>
.header {
  width: 100%;
  height: auto;
}

.logo {
  width: 4rem;
}
</style>

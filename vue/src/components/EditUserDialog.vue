<template>
	<el-dialog v-model="props.isVisibleDialog" width="600" @close="closeDialog">
		<template #title="scope">
			<el-text class="fs-3">ユーザー編集</el-text>
		</template>

		<el-form
			status-icon
			class="row mt-3"
			label-width="auto"
			label-position="left"
		>
			<el-form-item label="ログインID"
				><el-input clearable v-model="user.loginId"
			/></el-form-item>
			<el-form-item label="名前"
				><el-input clearable v-model="user.userName"
			/></el-form-item>
			<el-form-item label="拠点会社名"
				><el-select v-model="user.company" placeholder="">
					<el-option
						v-for="company in companies"
						:value="company.name"
						:key="company.id"
						:label="company.name"
					></el-option> 
				</el-select></el-form-item>
			<el-form-item label="パスワード"
				><el-input clearable
			/></el-form-item>
			<el-form-item label="パスワード（再）"
				><el-input clearable
			/></el-form-item>
		</el-form>
		<!-- ダイアログフッター部 -->
		<template #footer>
			<div>
				<el-button :plain="true" @click="closeDialog">キャンセル</el-button>
				<el-button type="primary" @click="closeDialog">登録</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { companyResponse } from "../dammy-data";

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

const companies = companyResponse.data;
const user = computed(() => {
	return {
		loginId: props.selectedRowData.loginId,
		userName: props.selectedRowData.userName,
		companyName: props.selectedRowData.companyName
	}
});
const emit = defineEmits(["close-dialog"]);
const closeDialog = () => {
	emit("close-dialog", false);
};
</script>

<style scoped></style>

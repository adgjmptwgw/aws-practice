import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import "@/style.css";
import App from "@/pages/App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// NOTE: bootstrapを適用
import "bootstrap/dist/css/bootstrap.min.css";
// NOTE: bootstrap-iconsを適用
import "bootstrap-icons/font/bootstrap-icons.css";

const pinia = createPinia();
// NOTE: piniaにて、一部データの永続化ができる様にするプラグインのライブラリを定義（ログイントークン情報は永続化したいため）
pinia.use(createPersistedState());

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ElementPlus);
// NOTE: 必ず最後に記載する。プラグイン（Vue RouterやElement UI Plus等）を最初に読み込んでおき、最後にアプリケーションを特定のDOM要素にマウントする。
app.mount("#app");

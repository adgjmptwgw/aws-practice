import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "@/stores/user";
import Test from "@/pages/Test.vue";
import Login from "@/pages/Login.vue";
import GoodsInventoryList from "@/pages/GoodsInventoryList.vue";
import ShippingInfoList from "@/pages/ShippingInfoList.vue";
import UserManagement from "@/pages/UserManagement.vue";
import ScheduledArrivalResult from "@/pages/ScheduledArrivalResult.vue";
import WarehousingResultDetail from "@/pages/WarehousingResultDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ホーム画面
    {
      path: "/",
      name: "home",
      component: GoodsInventoryList,
    },
    // ログイン画面
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    // TODO: 削除予定
    {
      path: "/test",
      name: "test",
      component: Test,
    },
    // サイドバータブ1：商品在庫管理一覧
    {
      path: "/goods-inventory-list",
      name: "goodsInventoryList",
      component: GoodsInventoryList,
    },
    // サイドバータブ2：出荷情報一覧画面
    {
      path: "/shipping-Info-list",
      name: "shippingInfoList",
      component: ShippingInfoList,
    },
    // サイドバータブ3：ユーザー管理
    {
      path: "/users",
      name: "userManagement",
      component: UserManagement,
    },
    // 入出荷実績比較ページ
    {
      path: "/scheduled-arrival-result",
      name: "scheduledArrivalResult",
      component: ScheduledArrivalResult,
    },
    // 入出荷予定実績詳細ページ
    {
      path: "/warehousing-result-detail",
      name: "warehousingResultDetail",
      component: WarehousingResultDetail,
    },
  ],
});

// TODO: 未ログインユーザーはログイン画面以外にアクセスできないように実装する
// router.beforeEach((to, from, next) => {
//   const user = userStore();
//   // NOTE: ログイン済みでなければ、ログイン画面へ遷移させる
//   if (user.loginUserInfo.isLoggedIn === false) {
//     next({ path: "/login" });
//   }

//   next();
// });

export default router;

const menu = {
  administer: [
    {
      title: "商品在庫管理一覧",
      routePath: "/goods-inventory-list",
      icon: "bi bi-cpu",
    },
    {
      title: "出荷情報一覧",
      routePath: "/shipping-Info-list",
      icon: "bi bi-cpu",
    },
    {
      title: "ユーザー管理",
      routePath: "/users",
      icon: "bi bi-person",
    },
  ],
  // TODO: ロール：powerUser用
  powerUser: [],
  // TODO: ロール：commonUser用
  commonUser: [],
};

export default menu;

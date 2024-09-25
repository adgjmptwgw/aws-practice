// TODO: ダミーデータの為、DBからデータを取得できるようになれば本ファイルは削除する。
export const equipmentPlansResponse = {
  data: [
    {
      goodsId: "001",
      goodsNumber: "001",
      tagId: "10001AAA0000000000000000",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "ダウンジャケット",
      currentLocation: "東京",
      currentEvent: "●×ライブ",
      storeName: "Aストア",
      lendingStatus: "warehouse-receipt", // 倉庫入荷
      usageCount: "1",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-01 00:00:00",
      stockedDate: "2024-08-01 00:00:00",
      deliveredDate: "2024-08-01 01:00:00",
    },
    {
      goodsId: "002",
      goodsNumber: "002",
      tagId: "10001AAA0000000000000001",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "三角コーン",
      currentLocation: "横浜",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "on-site-receiving", // 現場貸出
      usageCount: "1",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "",
      stockedDate: "2024-08-01 12:00:00",
      deliveredDate: "2024-08-01 13:00:00",
    },
    {
      goodsId: "003",
      goodsNumber: "003",
      tagId: "10001AAA0000000000000002",
      userId: "2",
      partEmployeeId: "2",
      equipmentId: "1",
      productName: "Tシャツ",
      currentLocation: "横浜",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "lost", // 現場入荷
      usageCount: "1",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "",
      reason: "紛失",
      stockedDate: "2024-08-02 00:00:00",
      deliveredDate: "2024-08-02 01:00:00",
    },
    {
      goodsId: "004",
      goodsNumber: "004",
      tagId: "10001AAA0000000000000000",
      userId: "2",
      partEmployeeId: "2",
      equipmentId: "1",
      productName: "展示会パネル",
      currentLocation: "横浜",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "on-site-shipment", // 現場出荷
      usageCount: "2",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-02 12:00:00",
      stockedDate: "2024-08-02 12:00:00",
      deliveredDate: "2024-08-02 13:00:00",
    },
    {
      goodsId: "005",
      goodsNumber: "005",
      tagId: "10001AAA0000000000000000",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "ヘルメット",
      currentLocation: "東京",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "warehouse-receipt", // 倉庫入荷
      usageCount: "2",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-03 00:00:00",
      stockedDate: "2024-08-03 00:00:00",
      deliveredDate: "2024-08-03 01:00:00",
    },
    {
      goodsId: "006",
      goodsNumber: "006",
      tagId: "10001AAA0000000000000000",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "消火器",
      currentLocation: "東京",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "lost", // 倉庫出荷
      usageCount: "2",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "",
      reason: "紛失",
      stockedDate: "2024-08-03 12:00:00",
      deliveredDate: "2024-08-03 13:00:00",
    },
    {
      goodsId: "007",
      goodsNumber: "007",
      tagId: "10001AAA0000000000000000",
      userId: "3",
      partEmployeeId: "3",
      equipmentId: "1",
      productName: "円卓",
      currentLocation: "埼玉",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "laundry-receiving", // ランドリー入荷
      usageCount: "2",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-04 00:00:00",
      stockedDate: "2024-08-04 00:00:00",
      deliveredDate: "2024-08-04 01:00:00",
    },
    {
      goodsId: "008",
      goodsNumber: "008",
      tagId: "10001AAA0000000000000000",
      userId: "3",
      partEmployeeId: "3",
      equipmentId: "1",
      productName: "ライブ配信機材",
      currentLocation: "埼玉",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "laundry-shippingReceiving", // ランドリー出荷
      usageCount: "2",
      washingCount: "2",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-04 12:00:00",
      stockedDate: "2024-08-04 12:00:00",
      deliveredDate: "2024-08-04 13:00:00",
    },
    {
      goodsId: "009",
      goodsNumber: "009",
      tagId: "10001AAA0000000000000000",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "トランシーバー",
      currentLocation: "東京",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "on-site-receiving", // 倉庫入荷
      usageCount: "2",
      washingCount: "2",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "",
      stockedDate: "2024-08-05 00:00:00",
      deliveredDate: "2024-08-05 01:00:00",
    },
    {
      goodsId: "010",
      goodsNumber: "010",
      tagId: "10001AAA0000000000000000",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "ポスタースタンド",
      currentLocation: "東京",
      currentEvent: "△◇コンサート",
      storeName: "Aストア",
      lendingStatus: "warehouse-shipping", // 倉庫入荷
      usageCount: "2",
      washingCount: "2",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-06 12:00:00",
      stockedDate: "2024-08-06 12:00:00",
      deliveredDate: "2024-08-06 13:00:00",
    },
  ],
  pagination: {
    total: 10,
  },
};

export const equipmentPlansResponse2 = {
  data: [
    {
      lendingId: "001",
      lendingNumber: "001",
      tagId: "10001AAA0000000000000000",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "ダウンジャケット",
      currentLocation: "東京",
      currentEvent: "●×ライブ",
      eventName: "Aライブ",
      lendingStatus: "warehouse-shipping", // 倉庫出荷
      usageCount: "1",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-01 00:00:00",
      stockedDate: "2024-08-01 00:00:00",
      deliveredDate: "2024-08-01 01:00:00",
    },
    {
      lendingId: "001",
      lendingNumber: "001",
      tagId: "10001AAA0000000000000001",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "三角コーン",
      currentLocation: "横浜",
      currentEvent: "△◇コンサート",
      eventName: "Bライブ",
      lendingStatus: "on-site-receiving", // 現場貸出
      usageCount: "1",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-02 00:00:00",
      stockedDate: "2024-08-01 12:00:00",
      deliveredDate: "2024-08-01 13:00:00",
    },
    {
      lendingId: "001",
      lendingNumber: "001",
      tagId: "10001AAA0000000000000002",
      userId: "2",
      partEmployeeId: "2",
      equipmentId: "1",
      productName: "Tシャツ",
      currentLocation: "横浜",
      currentEvent: "△◇コンサート",
      eventName: "Cライブ",
      lendingStatus: "on-site-lending", // 現場入荷
      usageCount: "1",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-02 00:00:00",
      reason: "紛失",
      stockedDate: "2024-08-02 00:00:00",
      deliveredDate: "2024-08-02 01:00:00",
    },
    {
      lendingId: "001",
      lendingNumber: "001",
      tagId: "10001AAA0000000000000000",
      userId: "2",
      partEmployeeId: "2",
      equipmentId: "1",
      productName: "展示会パネル",
      currentLocation: "横浜",
      currentEvent: "△◇コンサート",
      eventName: "Aフェスティバル",
      lendingStatus: "on-site-shipment", // 現場出荷
      usageCount: "2",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "2024-08-02 12:00:00",
      stockedDate: "2024-08-02 12:00:00",
      deliveredDate: "2024-08-02 13:00:00",
    },
    {
      lendingId: "001",
      lendingNumber: "001",
      tagId: "10001AAA0000000000000000",
      userId: "1",
      partEmployeeId: "1",
      equipmentId: "1",
      productName: "ヘルメット",
      currentLocation: "東京",
      currentEvent: "△◇コンサート",
      eventName: "Bフェスティバル",
      lendingStatus: "warehouse-receipt", // 倉庫入荷
      usageCount: "2",
      washingCount: "1",
      company: "テスト株式会社",
      createdAt: "2024-06-01 00:00:00",
      updatedAt: "2024-06-02 12:00:00",
      returnDate: "",
      stockedDate: "2024-08-03 00:00:00",
      deliveredDate: "2024-08-03 01:00:00",
    },
  ],
  pagination: {
    total: 5,
  },
};

// 倉庫出荷履歴テーブル表示用
export const laundryHistoriesResponse = {
  data: [
    {
      laundryHistoryId: "1",
      deliveredDate: "2024-08-01 12:00:00",
      stockedDate: "2024-08-01 00:00:00",
    },
    {
      laundryHistoryId: "2",
      deliveredDate: "2024-08-02 12:00:00",
      stockedDate: "2024-08-02 00:00:00",
    },
    {
      laundryHistoryId: "3",
      deliveredDate: "2024-08-03 12:00:00",
      stockedDate: "2024-08-03 00:00:00",
    },
    {
      laundryHistoryId: "4",
      deliveredDate: "2024-08-04 12:00:00",
      stockedDate: "2024-08-04 00:00:00",
    },
    {
      laundryHistoryId: "5",
      deliveredDate: "2024-08-05 12:00:00",
      stockedDate: "2024-08-05 00:00:00",
    },
    {
      laundryHistoryId: "6",
      deliveredDate: "2024-08-06 12:00:00",
      stockedDate: "2024-08-06 00:00:00",
    },
    {
      laundryHistoryId: "7",
      deliveredDate: "2024-08-07 12:00:00",
      stockedDate: "2024-08-07 00:00:00",
    },
    {
      laundryHistoryId: "8",
      deliveredDate: "2024-08-08 12:00:00",
      stockedDate: "2024-08-08 00:00:00",
    },
    {
      laundryHistoryId: "9",
      deliveredDate: "2024-08-09 12:00:00",
      stockedDate: "2024-08-09 00:00:00",
    },
    {
      laundryHistoryId: "10",
      deliveredDate: "2024-08-10 12:00:00",
      stockedDate: "2024-08-10 00:00:00",
    },
  ],
  pagination: {
    total: 10,
  },
};

// 倉庫出荷情報テーブル表示用
export const shippingInfoList = {
  data: [
    {
      shippingInfoId: "1",
      voucherNumber: "00001234",
      shipFrom: "東京倉庫",
      shipTo: "横浜アリーナ",
      eventName: "Aライブ",
      stockedDate: "2024-08-01 00:00:00",
      shipDate: "2024-07-01 00:00:00",
      deliveredDate: "2024-08-01 01:00:00",
      lendingStatus: "warehouse-shipping", // 倉庫出荷
    },
    {
      shippingInfoId: "2",
      voucherNumber: "00005678",
      shipFrom: "横浜アリーナ",
      shipTo: "さいたまスーパーアリーナ",
      eventName: "Bライブ",
      stockedDate: "2024-08-01 12:00:00",
      shipDate: "2024-07-01 00:00:00",
      deliveredDate: "2024-08-01 13:00:00",
      lendingStatus: "on-site-shipment", // 現場出荷
    },
    {
      shippingInfoId: "3",
      voucherNumber: "11561234",
      shipFrom: "さいたまスーパーアリーナ",
      shipTo: "桜木町ランドリー",
      eventName: "Cライブ",
      stockedDate: "2024-08-02 00:00:00",
      shipDate: "2024-07-01 00:00:00",
      deliveredDate: "2024-08-02 01:00:00",
      lendingStatus: "laundry-shippingReceiving", // ランドリー出荷
    },
    {
      shippingInfoId: "4",
      voucherNumber: "68941234",
      shipFrom: "桜木町ランドリー",
      shipTo: "幕張メッセ",
      eventName: "Dライブ",
      stockedDate: "2024-08-02 12:00:00",
      shipDate: "2024-07-01 00:00:00",
      deliveredDate: "2024-08-02 13:00:00",
      lendingStatus: "on-site-shipment", // 現場出荷
    },
    {
      shippingInfoId: "5",
      voucherNumber: "70089520",
      shipFrom: "幕張メッセ",
      shipTo: "東京倉庫",
      eventName: "Eライブ",
      stockedDate: "2024-08-03 00:00:00",
      shipDate: "2024-07-01 00:00:00",
      deliveredDate: "2024-08-03 01:00:00",
      lendingStatus: "on-site-shipment", // 現場出荷
    },
  ],
  pagination: {
    total: 5,
  },
};

export const warehousingResultDetail = {
  data: [
    {
      lendingId: "001",
      isReadingCode: true,
      reason: "",
    },
    {
      lendingId: "002",
      isReadingCode: false,
      reason: "紛失",
    },
    {
      lendingId: "003",
      isReadingCode: false,
      reason: "紛失",
    },
    {
      lendingId: "004",
      isReadingCode: true,
      reason: "",
    },
    {
      lendingId: "005",
      isReadingCode: true,
      reason: "",
    },
  ],
  pagination: {
    total: 5,
  },
};

export const scheduledArrivalResultResponse = {
  data: [
    {
      shippingInfoId: "1",
      productName: "円卓",
      scheduledArrivalQuantity: "50",
      resultArrivalQuantity: "50",
      quantityDiff: "0",
    },
    {
      shippingInfoId: "2",
      productName: "三角コーン",
      scheduledArrivalQuantity: "10",
      resultArrivalQuantity: "10",
      quantityDiff: "0",
    },
    {
      shippingInfoId: "3",
      productName: "ダウンジャケット",
      scheduledArrivalQuantity: "30",
      resultArrivalQuantity: "25",
      quantityDiff: "-5",
    },
    {
      shippingInfoId: "4",
      productName: "トランシーバー",
      scheduledArrivalQuantity: "12",
      resultArrivalQuantity: "10",
      quantityDiff: "-2",
    },
    {
      shippingInfoId: "5",
      productName: "ライブ配信機材",
      scheduledArrivalQuantity: "2",
      resultArrivalQuantity: "2",
      quantityDiff: "0",
    },
    {
      shippingInfoId: "6",
      productName: "ポスタースタンド",
      scheduledArrivalQuantity: "15",
      resultArrivalQuantity: "15",
      quantityDiff: "0",
    },
    {
      shippingInfoId: "7",
      productName: "Tシャツ(XL)",
      scheduledArrivalQuantity: "2",
      resultArrivalQuantity: "0",
      quantityDiff: "-2",
    },
    {
      shippingInfoId: "8",
      productName: "Tシャツ(S)",
      scheduledArrivalQuantity: "20",
      resultArrivalQuantity: "20",
      quantityDiff: "0",
    },
    {
      shippingInfoId: "9",
      productName: "Tシャツ(M)",
      scheduledArrivalQuantity: "50",
      resultArrivalQuantity: "49",
      quantityDiff: "-1",
    },
    {
      shippingInfoId: "10",
      productName: "Tシャツ(L)",
      scheduledArrivalQuantity: "30",
      resultArrivalQuantity: "30",
      quantityDiff: "0",
    },
  ],
  pagination: {
    total: 10,
  },
};

export const usersResponse = {
  data: [
    {
      loginId: "1",
      userName: "田中一郎",
      companyName: "テスト株式会社",
    },
    {
      loginId: "2",
      userName: "山田太郎",
      companyName: "北海道テスト会社",
    },
    {
      loginId: "3",
      userName: "田中二郎",
      companyName: "東北テスト会社",
    },
    {
      loginId: "4",
      userName: "田中三郎",
      companyName: "埼玉テスト会社",
    },
    {
      loginId: "5",
      userName: "田中四郎",
      companyName: "大阪テスト会社",
    },
    {
      loginId: "6",
      userName: "田中伍郎",
      companyName: "西日本テスト会社",
    },
  ],
  pagination: {
    total: 6,
  },
};

export const companyResponse = {
  data: [
    {
      name: "テスト株式会社",
      id: 1,
    },
    {
      name: "北海道テスト会社",
      id: 2,
    },
    {
      name: "東北テスト会社",
      id: 3,
    },
    {
      name: "埼玉テスト会社",
      id: 4,
    },
    {
      name: "大阪テスト会社",
      id: 5,
    },
    {
      name: "西日本テスト会社",
      id: 6,
    },
    {
      name: "沖縄テスト会社",
      id: 7,
    },
  ],
  pagination: {
    total: 6,
  },
};

export const storeResponse = {
  data: [
    {
      storeName: "Aストア",
      date: "2024-09-01",
      address: "東京都千代田区千代田1-1",
    },
    {
      storeName: "Bストア",
      date: "2024-09-15",
      address: "東京都千代田区千代田1-2",
    },
    {
      storeName: "Cストア",
      date: "2024-10-01",
      address: "東京都千代田区千代田1-3",
    },
    {
      storeName: "Dストア",
      date: "2024-10-09",
      address: "東京都千代田区千代田1-4",
    },
    {
      storeName: "Eストア",
      date: "2024-11-30",
      address: "東京都千代田区千代田1-5",
    },
  ],
  pagination: {
    total: 5,
  },
};

export const status = [
  {
    name: "倉庫出荷",
    id: 1,
  },
  {
    name: "現場入荷",
    id: 2,
  },
  {
    name: "現場貸出",
    id: 3,
  },
  {
    name: "現場返却",
    id: 4,
  },
  {
    name: "倉庫入荷",
    id: 5,
  },
  {
    name: "廃棄",
    id: 6,
  },

  {
    name: "紛失",
    id: 7,
  },
];

export const enableToChangeStatus = [
  {
    name: "倉庫入荷",
    id: 5,
  },
  {
    name: "廃棄",
    id: 6,
  },

  {
    name: "紛失",
    id: 7,
  },
  {
    name: "破損",
    id: 8,
  },
];

export const getDammyData = async (dammyData) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(dammyData);
    }, 1000);
  });
};

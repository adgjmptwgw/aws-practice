import { reactive } from "vue";

export const usePagination = () => {
  /** ページネーション用のパラメータ（APIのリクエストパラメータにも用いる） */
  const pagination = reactive({
    perPage: 20,
    total: 0,
    page: 1,
  });
  /** ページネーションにて、開いているページを変更 */
  const changeCurrentPage = (currentPage) => {
    pagination.page = currentPage;
  };
  /** ページネーションにて表示するテーブルのアイテム数の最大値を変更 */
  const changeTotalItems = (totalItems) => {
    pagination.total = totalItems;
  };

  return {
    pagination,
    changeCurrentPage,
    changeTotalItems,
  };
};

import { ref } from "vue";

/**
 * モーダルの表示状態の管理、モーダルの表示切替を管理する
 * @returns {boolean} isVisibleDialog - モーダルの状態を管理
 * @returns {boolean} switchVisbleDialog - モーダルの表示/非表示を切り替える
 */
export const useModal = () => {
  /** テーブルのダイアログ表示/非表示ステータス管理用 */
  const isVisibleDialog = ref(false);
  /** ダイアログの表示/非表示を切り替える */
  const switchVisbleDialog = (isOpen) => (isVisibleDialog.value = isOpen);

  return {
    isVisibleDialog,
    switchVisbleDialog,
  };
};

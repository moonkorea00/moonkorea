import type { ToastOptions } from './toast.type';

export const generateId = (() => {
  let count = 0;
  return () => ++count;
})();

export const TOAST: Record<string, ToastOptions> = {
  DELETE_COMMENT: {
    type: 'dialog',
    description: '댓글을 삭제하시겠습니까?',
    confirmLabel: '삭제',
    confirmType: 'delete',
    dismissLabel: '취소',
  },
  ERROR: {
    type: 'error',
    description: '문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    duration: 2500,
  },
};

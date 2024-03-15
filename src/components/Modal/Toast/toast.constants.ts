import type { ToastOptions } from './toast.type';

interface ToastOptionsConstants {
  DELETE_COMMENT: ToastOptions;
  ERROR: Omit<ToastOptions, 'id'>;
}

export const TOAST: ToastOptionsConstants = {
  DELETE_COMMENT: {
    id: 'delete_comment',
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

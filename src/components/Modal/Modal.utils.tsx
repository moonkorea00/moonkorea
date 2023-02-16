import LoginModal from './Login/Login';

export const MODAL_CONFIG = {
  LOGIN: {
    type: 'default',
    content: <LoginModal />,
  },
  DELETE_CONFIRMATION: {
    type: 'dialog',
    content: '댓글을 삭제하시겠습니까?',
    confirmText: '삭제',
  },
  ERROR: {
    type: 'default',
    content: '잠시 후 시도해주세요.',
    duration: 1500,
  },
};

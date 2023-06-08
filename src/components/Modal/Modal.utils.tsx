import LoginModal from './Login/Login';

export const MODAL_CONFIG = {
  login: {
    type: 'default',
    content: <LoginModal />,
  },
  'delete_comment': {
    type: 'dialog',
    content: '댓글을 삭제하시겠습니까?',
    confirmText: '삭제',
  },
  error: {
    type: 'default',
    content: '문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    duration: 2500,
  },
};
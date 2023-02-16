import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useModal from '@components/Modal/hooks/useModal';
import { deleteComment } from '@lib/comment';
import { CommentProps } from '@@types/comments';
import { MODAL_CONFIG } from '@components/Modal/Modal.utils';

const useDeleteComment = (comments: CommentProps) => {
  const queryClient = useQueryClient();
  const {
    modalConfig: deleteToastConfig,
    showModal,
    closeModal: closeDeleteToast,
  } = useModal();

  const { mutate, isLoading: isDeleting } = useMutation(deleteComment, {
    onSuccess: () => {
      closeDeleteToast();
      queryClient.invalidateQueries(['comments']);
    },
    onError: err => {
      if (isAxiosError(err)) {
        if (!err.response) {
          throw Error('no existing response');
        }
        return showModal(MODAL_CONFIG.ERROR);
      }
    },
  });

  const onDeleteComment = () => {
    try {
      mutate({ id: comments.id });
    } catch (err) {
      if (isAxiosError(err)) {
        if (!err.response) {
          throw Error('no existing response');
        }
        return showModal(MODAL_CONFIG.ERROR);
      }
    }
  };

  return {
    deleteToastConfig,
    showModal,
    closeDeleteToast,
    onDeleteComment,
    isDeleting,
  };
};

export default useDeleteComment;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useModal from '@components/Modal/hooks/useModal';
import { deleteComment } from '@lib/comment';
import { CommentProps } from '@@types/comments';
import { getPostId } from '../Comments.utils';
import { sendNotificationEmail } from '@lib/notificationEmail';

const useDeleteComment = (comments: CommentProps) => {
  const queryClient = useQueryClient();
  const postId = getPostId();

  const {
    modalConfig: deleteToastConfig,
    showModal,
    closeModal: closeDeleteToast,
  } = useModal();

  const { mutate, isLoading: isDeleting } = useMutation(deleteComment, {
    onSuccess: () => {
      closeDeleteToast();
      queryClient.invalidateQueries(['comments']);
      sendNotificationEmail({ postId });
    },
    onError: err => {
      if (isAxiosError(err)) {
        return showModal('error');
      }
    },
  });

  const onDeleteComment = () => {
    try {
      mutate({ id: comments.id, postId });
    } catch (err) {
      if (isAxiosError(err)) {
        return showModal('error');
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

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useModal from '@components/Modal/hooks/useModal';
import { CommentProps } from '@@types/comments';
import { updateComment } from '@lib/comment';
import { getPostId } from '../Comments.utils';
import { sendNotificationEmail } from '@lib/notificationEmail';

const useEditComment = (
  comments: CommentProps,
  setIsEditMode: Dispatch<SetStateAction<boolean>>
) => {
  const [edittedComment, setEdittedComment] = useState(comments?.body);
  const queryClient = useQueryClient();

  const { modalConfig: editCommentErr, showModal } = useModal();
  const postId = getPostId();

  const { mutate, isLoading: isSubmittingEdittedComment } = useMutation(
    updateComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments']);
        setIsEditMode(false);
        sendNotificationEmail({ postId, body: edittedComment as string });
      },
      onError: err => {
        if (isAxiosError(err)) {
          return showModal('error');
        }
      },
    }
  );

  const handleEditComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setEdittedComment(e.target.value);

  const onEditComment = () => {
    if (edittedComment === comments?.body || !edittedComment) return;
    mutate({
      id: comments.id,
      body: edittedComment as string,
      postId,
    });
  };

  return {
    edittedComment,
    handleEditComment,
    onEditComment,
    isSubmittingEdittedComment,
    editCommentErr,
  };
};

export default useEditComment;

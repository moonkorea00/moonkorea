import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useModal from '@components/Modal/hooks/useModal';
import { CommentProps } from '@@types/comments';
import { updateComment } from '@lib/comment';
import { MODAL_CONFIG } from '@components/Modal/Modal.utils';
import { getPostId } from '../Comments.utils';

const useEditComment = (
  comments: CommentProps,
  setIsEditMode: Dispatch<SetStateAction<boolean>>
) => {
  const [edittedComment, setEdittedComment] = useState(comments?.body);
  const queryClient = useQueryClient();
  const postId = getPostId();
  const { showModal } = useModal();

  const { mutate, isLoading: isSubmittingEdittedComment } = useMutation(
    updateComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments']);
        setIsEditMode(false);
      },
      onError: err => {
        if (isAxiosError(err)) {
          if (!err.response) {
            throw Error('no existing response');
          }
          return showModal(MODAL_CONFIG.ERROR);
        }
      },
    }
  );

  const handleEditComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setEdittedComment(e.target.value);

  const onEditComment = () => {
    if (edittedComment === comments?.body) return;
    try {
      mutate({
        id: comments.id,
        body: edittedComment as string,
        postId,
      });
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
    edittedComment,
    handleEditComment,
    onEditComment,
    isSubmittingEdittedComment,
  };
};

export default useEditComment;

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useModal from '@components/Modal/hooks/useModal';
import { CommentProps } from '@@types/comments';
import { createComment } from '@lib/comment';
import { getPostId } from '../Comments.utils';
import { MODAL_CONFIG } from '@components/Modal/Modal.utils';

const useCreateComment = (
  comments: CommentProps,
  setIsReplyMode: Dispatch<SetStateAction<boolean>>,
  type: string
) => {
  const [comment, setComment] = useState('');
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const postId = getPostId();

  const { mutate, isLoading: isSubmitting } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
      setComment('');
      type === 'new_comment' && setIsReplyMode(false);
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

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  const onCreateComment = () => {
    if (!comment) return;
    try {
      mutate({
        postId,
        body: comment,
        // TODO
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        userId: session?.user?.id,
        parentId: comments?.id,
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
    comment,
    handleComment,
    onCreateComment,
    isSubmitting,
  };
};

export default useCreateComment;

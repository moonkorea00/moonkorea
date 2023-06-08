import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import useModal from '@components/Modal/hooks/useModal';
import { CommentProps } from '@@types/comments';
import { createComment } from '@lib/comment';
import { getPostId } from '../Comments.utils';
import { sendNotificationEmail } from '@lib/notificationEmail';

const useCreateComment = (
  comments: CommentProps,
  setIsReplyMode: Dispatch<SetStateAction<boolean>>,
  type: string,
  isReplyMode?: boolean
) => {
  const [comment, setComment] = useState('');
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  
  const { modalConfig: createCommentErr, showModal } = useModal();
  const postId = getPostId();

  const { mutate, isLoading: isSubmitting } = useMutation(createComment, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['comments']);
      setComment('');
      type === 'new_comment' && isReplyMode && setIsReplyMode(false);
      await sendNotificationEmail({ postId, body: comment });
    },
    onError: err => {
      if (isAxiosError(err)) {
        return showModal('error');
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
        userEmail: session?.user?.email as string,
        parentId: comments?.id,
      });
    } catch (err) {
      if (isAxiosError(err)) {
        return showModal('error');
      }
    }
  };

  return {
    comment,
    handleComment,
    onCreateComment,
    isSubmitting,
    createCommentErr,
  };
};

export default useCreateComment;

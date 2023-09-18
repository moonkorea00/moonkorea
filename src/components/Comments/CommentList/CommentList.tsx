import type { CommentProps } from '@@types/comments';
import Comment from '../Comment/Comment';

interface CommentListProps {
  comments: CommentProps[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments?.map((comments: CommentProps) => (
        <Comment key={comments.id} comments={comments} />
      ))}
    </>
  );
};

export default CommentList;

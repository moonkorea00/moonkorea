import Comment from '../Comment/Comment';
import { CommentProps } from '@@types/comments';

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

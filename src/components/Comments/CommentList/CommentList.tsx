import type { Comment as IComment } from '@@types/comments';
import Comment from '../Comment/Comment';

interface CommentListProps {
  comments: IComment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <>
      {comments?.map((comments: IComment) => (
        <Comment key={comments.id} comments={comments} />
      ))}
    </>
  );
};

export default CommentList;

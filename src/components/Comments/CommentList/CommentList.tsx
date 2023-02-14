import Comment from '../Comment/Comment';
import { CommentProps } from '@@types/comments';

const CommentList = ({ comments }: { comments: CommentProps[] }) => {
  return (
    <>
      {comments?.map((comments: CommentProps) => (
        <Comment key={comments.id} comments={comments} />
      ))}
    </>
  );
};

export default CommentList;

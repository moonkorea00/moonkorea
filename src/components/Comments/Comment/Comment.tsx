import type { Comment as IComment } from '@@types/comments';

import { useState } from 'react';

import * as S from './Comment.style';
import UserAvatar from './UserAvatar/UserAvatar';
import CommentBody from './CommentBody/CommentBody';
import CommentHeader from './CommentHeader/CommentHeader';
import CommentList from '../CommentList/CommentList';

interface CommentProps {
  comments: IComment;
}

enum CommentMode {
  View = 'VIEW',
  Edit = 'EDIT',
  Reply = 'REPLY',
}

const Comment = ({ comments }: CommentProps) => {
  const { parentId, depth, isDeleted, user } = comments;
  const [mode, setMode] = useState(CommentMode.View);

  return (
    <S.Container parentId={parentId} depth={depth}>
      <S.CommentContainer>
        <UserAvatar isDeleted={isDeleted} user={user} />
        <S.ContentContainer>
          <CommentHeader
            comments={comments}
            onResetMode={() => setMode(CommentMode.View)}
            onEditMode={() => setMode(CommentMode.Edit)}
            onReplyMode={() => setMode(CommentMode.Reply)}
          />
          <CommentBody
            comments={comments}
            isEditMode={mode === CommentMode.Edit}
            isReplyMode={mode === CommentMode.Reply}
            onResetMode={() => setMode(CommentMode.View)}
          />
        </S.ContentContainer>
      </S.CommentContainer>
      {comments.children.length > 0 && (
        <CommentList comments={comments.children} />
      )}
    </S.Container>
  );
};

export default Comment;

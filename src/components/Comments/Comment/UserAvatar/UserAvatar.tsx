import type { Comment } from '@@types/comments';

import * as S from './UserAvatar.style';

import { assets } from '@utils/assetsPath';

const UserAvatar = ({
  isDeleted,
  user,
}: Pick<Comment, 'isDeleted' | 'user'>) => {
  return (
    <S.AvatarContainer>
      <S.Avatar
        src={
          isDeleted
            ? assets.defaultUserAvatar
            : user.image ?? assets.defaultUserAvatar
        }
        alt="avatar"
      />
    </S.AvatarContainer>
  );
};

export default UserAvatar;

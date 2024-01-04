import type { HomePost } from '@@types/post';

import Link from 'next/link';

import * as S from './PostItem.style';

const PostItem = ({
  id,
  title,
  date,
  excerpt,
}: HomePost) => {
  return (
    <S.Container>
      <Link href={`/${id}`}>
        <S.Title>{title}</S.Title>
        <S.Description>{excerpt}</S.Description>
        <S.PublishDate>{date.replaceAll('-', '.')}</S.PublishDate>
      </Link>
    </S.Container>
  );
};

export default PostItem;

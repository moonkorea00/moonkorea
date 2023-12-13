import type { FrontMatter } from '@@types/metaData';
import * as S from './PostItem.style';
import Link from 'next/link';

const PostItem = ({ id, title, date, description }: FrontMatter) => {
  return (
    <S.Container>
      <Link href={`/${id}`}>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.PublishDate>{date.replaceAll('-', '.')}</S.PublishDate>
      </Link>
    </S.Container>
  );
};

export default PostItem;

import type { FrontMatter } from '@@types/metaData';
import * as S from './PreviewPost.style';
import Link from 'next/link';

const PreviewPost = ({ id, title, date, tags, description }: FrontMatter) => {
  const postTags = tags?.split(', ');

  return (
    <S.Container>
      <Link href={`/${id}`}>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.TagContainer>
          {postTags?.map((tag, idx) => (
            <S.Tags key={idx}>{tag}</S.Tags>
          ))}
        </S.TagContainer>
        <S.PublishDate>{date.replaceAll('-', '.')}</S.PublishDate>
      </Link>
    </S.Container>
  );
};

export default PreviewPost;

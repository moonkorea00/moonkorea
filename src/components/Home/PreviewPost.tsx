import type { FrontMatter } from '@@types/metaData';
import * as S from './PreviewPost.style';
import Link from 'next/link';

interface PreviewPostProps {
  postData: FrontMatter;
}

const PreviewPost = ({ postData }: PreviewPostProps) => {
  const { id, title, date, tags, description } = postData;
  const tagsArray = tags?.split(', ');

  return (
    <S.Container>
      <Link href={`/${id}`}>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.TagContainer>
          {tagsArray?.map((tag, idx) => (
            <S.Tags key={idx}>{tag}</S.Tags>
          ))}
        </S.TagContainer>
        <S.PublishDate>{date.replaceAll('-', '.')}</S.PublishDate>
      </Link>
    </S.Container>
  );
};

export default PreviewPost;

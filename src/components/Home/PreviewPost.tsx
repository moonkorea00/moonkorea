import * as S from './PreviewPost.style';
import Link from 'next/link';

interface PreviewPostProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

const PreviewPost = ({ id, title, date, excerpt }: PreviewPostProps) => {
  return (
    <S.Container>
      <S.FlexContainer>
        <Link href={`/${id}`}>
          <S.Title>{title}</S.Title>
        </Link>
        <S.PublishDate>{date}</S.PublishDate>
      </S.FlexContainer>
      <S.Excerpt>{excerpt}</S.Excerpt>
    </S.Container>
  );
};

export default PreviewPost;

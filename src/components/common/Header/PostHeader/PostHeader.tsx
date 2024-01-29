import * as S from './PostHeader.style';

interface PostHeaderProps {
  title: string;
  date: string;
  excerpt: string;
}

const PostHeader = ({ title, date, excerpt }: PostHeaderProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Description>{excerpt}</S.Description>
      <S.Date>
        <i>{date}</i>
      </S.Date>
    </S.Container>
  );
};

export default PostHeader;

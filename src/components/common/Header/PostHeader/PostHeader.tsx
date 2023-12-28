import * as S from './PostHeader.style';

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string;
  description: string;
}

const PostHeader = ({ title, date, description }: PostHeaderProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.Date>
        <i>{date}</i>
      </S.Date>
    </S.Container>
  );
};

export default PostHeader;

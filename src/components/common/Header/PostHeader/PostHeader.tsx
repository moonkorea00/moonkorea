import * as S from './PostHeader.style';

interface PostHeaderProps {
  metaData: {
    title: string;
    tags: string;
    description: string;
    date: string;
  };
}

const PostHeader = ({ metaData }: PostHeaderProps) => {
  const { title, date, tags, description } = metaData;
  const tagsArray = tags?.split(', ');

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <div>
        <S.Date>{date.replaceAll('-', '.')}</S.Date>
      </div>
      <S.TagContainer>
        {tagsArray?.map((tag, idx) => (
          <S.Tags key={idx}>{tag}</S.Tags>
        ))}
      </S.TagContainer>
    </S.Container>
  );
};

export default PostHeader;

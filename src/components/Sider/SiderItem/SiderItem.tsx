import * as S from './SiderItem.style';
import Link from 'next/link';

interface SiderItemProps {
  title: string;
  path: string;
  isSiderItemActive: boolean;
  onCloseSider: () => void;
}

const SiderItem = ({
  title,
  path,
  isSiderItemActive,
  onCloseSider,
}: SiderItemProps) => {
  return (
    <S.Container isSiderItemActive={isSiderItemActive}>
      -
      <Link href={`/${path}`}>
        <S.PostTitle onClick={onCloseSider}>{title}</S.PostTitle>
      </Link>
    </S.Container>
  );
};

export default SiderItem;

import * as S from './Header.style';
import Nav from '../Nav/Nav';
import HeaderContent from './HeaderContent/HeaderContent';

import useIsIntersected from '@hooks/useIsIntersected';

interface HeaderProps {
  title?: string;
  date?: string;
  description?: string;
  pageType?: string;
}

const Header = ({ title, date, description, pageType }: HeaderProps) => {
  const { isIntersected, ref } = useIsIntersected();

  return (
    <S.Container ref={ref} id="header">
      <Nav isHeaderInView={isIntersected} />
      <S.HeadingContainer>
        <HeaderContent
          title={title}
          date={date}
          description={description}
          pageType={pageType}
        />
      </S.HeadingContainer>
    </S.Container>
  );
};

export default Header;

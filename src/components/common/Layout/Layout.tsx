import * as S from './Layout.style';
import Header from '../Header/Header';

interface LayoutProps {
  children: React.ReactNode;
  metaData?: {
    id: string;
    title: string;
    tags: string;
    description: string;
    date: string;
  };
  pageType?: string;
}

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <S.Container>
      <Header metaData={props.metaData} pageType={props.pageType} />
      <S.Main>
        <S.ChildrenContainer>{children}</S.ChildrenContainer>
      </S.Main>
    </S.Container>
  );
};

export default Layout;

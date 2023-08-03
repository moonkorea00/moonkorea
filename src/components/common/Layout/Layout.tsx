import type { MetaData } from '@@types/metaData';
import * as S from './Layout.style';
import Header from '../Header/Header';
// import PostSider from '@components/PostSider/PostSider';

interface LayoutProps {
  children: React.ReactNode;
  metaData?: MetaData;
  pageType?: 'post' | '404';
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

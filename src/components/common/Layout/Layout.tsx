import * as S from './Layout.style';
import Header from '../Header/Header';
import CommentSection from '@components/Comments/CommentSection';

interface LayoutProps {
  children: React.ReactNode;
  metaData?: {
    id: string;
    title: string;
    tags:string;
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
        <S.ChildrenContainer>
          {children}
          {props.pageType === 'post' && <CommentSection />}
        </S.ChildrenContainer>
      </S.Main>
    </S.Container>
  );
};

export default Layout;

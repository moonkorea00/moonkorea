import * as S from './Layout.style';
import Sider from '@components/Sider/Sider';
import Header from '../Header/Header';
import ChatSupportWindow from '../ChatSupport/ChatSupportWindow';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <S.Container>
      <Header />
      <S.Main>
        <S.Article>{children}</S.Article>
        <Sider />
        <ChatSupportWindow />
      </S.Main>
    </S.Container>
  );
};

export default Layout;

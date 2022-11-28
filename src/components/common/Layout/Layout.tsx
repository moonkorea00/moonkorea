import * as S from './Layout.style';
import Sider from '../../Sider/Sider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <S.Container>
      <Sider />
      <S.Section>{children}</S.Section>
    </S.Container>
  );
};

export default Layout;

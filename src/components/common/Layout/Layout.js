import * as S from './Layout.style'
import Sider from '../../Sider/Sider';

const Layout = ({ children }) => {
  return (
    <S.Container>
      <Sider />
      <S.Section>{children}</S.Section>
    </S.Container>
  );
};

export default Layout;

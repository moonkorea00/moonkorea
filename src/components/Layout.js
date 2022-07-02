import styled from 'styled-components';
import SideNav from './SideNav/SideNav';

const Layout = ({ children }) => {
  return (
    <Container>
      <SideNav />
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.main`
  display: inline-flex;
  width: 100vw;
  height: 93vh;
`;
const Main = styled.section`
  width: 100%;
  height: 100%;
  padding: 5vh 5vw;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior-y: none;
`;
export default Layout;

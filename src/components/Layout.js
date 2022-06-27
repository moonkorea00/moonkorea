import styled from 'styled-components';

const Layout = ({ children }) => {
  return <Main>{children}</Main>;
};

const Main = styled.section`
  width: 100%;
  height: 85vh;
  padding: 5vh 5vw 0 5vw;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior-y: none;
`;
export default Layout;

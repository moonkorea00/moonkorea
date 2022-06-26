import styled from 'styled-components';

const Layout = ({ children }) => {
  return <Main>{children}</Main>;
};

const Main = styled.section`
  /* width: 70vw; */
  /* display: inline-block; */
  /* width: 100%; */
  width: 65%;
  height: 85vh;
  padding: 5vh 5vw 0 5vw;
  /* border: 1px solid red; */
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior-y: none;
  /* ::-webkit-scrollbar {
    display: none;
} */
`;
export default Layout;

import styled from 'styled-components';

const Nav = () => {
  return (
    <>
      <NavMain>moonkorea &copy; moonkorea {new Date().getFullYear()}</NavMain>
    </>
  );
};

const NavMain = styled.section`
  width: 100vw;
  height: 10vh;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid black;
`;
export default Nav;

import styled from 'styled-components';

const Nav = () => {
  return (
    <>
      <NavMain>
        moonkorea &copy; moonkorea {new Date().getFullYear()}
        <div>ddd</div>
      </NavMain>
    </>
  );
};

const NavMain = styled.header`
  ${({ theme }) => theme.flexSpaceBetween}
  height: 6vh;
  margin: 0;
  padding: 0 30px;
  border-bottom: 1px solid lightgrey;
`;

export default Nav;

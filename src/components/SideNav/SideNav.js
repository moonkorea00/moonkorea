import styled from 'styled-components';
import Category from './Category';
import navData from '../../nav.json';

const SideNav = () => {

  return (
    <Layout>
      {navData.map((item, idx) => (
        <Category item={item} key={idx} />
      ))}
    </Layout>
  );
};

const Layout = styled.nav`
  width: 30vw;
  height: 90vh;
  margin: 0;
  padding: 2vh 1vw 0 1.4vw;
  border-right: 1px solid lightgrey;
  background-color:#FAFAFA;
  overflow-y: scroll;
  overscroll-behavior-y: none;
`;

export default SideNav;

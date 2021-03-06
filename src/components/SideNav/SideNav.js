import styled from 'styled-components';
import Category from './Category';
import navData from '../../nav.json';

const SideNav = () => {
  return (
    <Layout>
      {navData.map((item, idx) => (
        <Category item={item} key={idx} id={idx}/>
      ))}
    </Layout>
  );
};

const Layout = styled.nav`
  width: 30vw;
  /* max-width: 450px; */
  margin: 0;
  padding: 2vh 1vw 0 1.4vw;
  border-right: 1px solid lightgrey;
  background-color: #fafafa;
  overflow-y: scroll;
  overscroll-behavior-y: none;
`;

export default SideNav;

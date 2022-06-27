import styled from 'styled-components';
import postList from '../../posts.json';
import Category from './Category';
import { useNavigate } from 'react-router';
import navData from '../../nav.json';

const SideNav = () => {
  const navigate = useNavigate();

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
  padding: 10px 0 0 2vw;
  border-right: 1px solid lightgrey;
  background-color:#FAFAFA;
  overflow-y: scroll;
  overscroll-behavior-y: none;
`;

export default SideNav;

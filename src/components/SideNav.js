import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { selectArticle } from '../modules/article';

const SideNav = () => {
  const dispatch = useDispatch();
  return (
    <SideNavMain>
      test
      <div style={{ display: 'inline-flex' }}>
        <div>blog</div>
        <div>test</div>
      </div>
    </SideNavMain>
  );
};

const SideNavMain = styled.div`
  width: 35%;
  /* width: 100%; */
  height: 90vh;
  margin: 0;
  padding: 0;
  border-right: 1px solid black;
  overflow-y: scroll;
  /* overflow-y: hidden; */
  overscroll-behavior-y: none;
  
`;
export default SideNav;

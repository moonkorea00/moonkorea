import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { selectArticle } from '../modules/article';

const SideNav = () => {
  const dispatch = useDispatch();
  return (
    <SideNavMain
      onClick={e => {
        dispatch(selectArticle(e.target.innerHTML));
        console.log(e.target.innerHTML);
      }}
    >
      test
      <div style={{ display: 'inline-flex' }}>
        <div>one</div>
        <div>two</div>
      </div>
    </SideNavMain>
  );
};

const SideNavMain = styled.div`
  width: 30vw;
  height: 90vh;
  margin: 0;
  padding: 0;
  border-right: 1px solid black;
  overflow-y: scroll;
  overscroll-behavior-y: none;
`;
export default SideNav;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  width: 100%;
  height: calc(100vh - 54px);
`;

export const Article = styled.article`
  width: 100%;
  padding: 25px 50px;
  overflow-y: scroll;
  overscroll-behavior-y: none;
`;

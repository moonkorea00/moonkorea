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
  width: calc(100vw - 360px);
  padding: 25px 50px;
  line-height: 35px;
  overflow-y: scroll;
  overscroll-behavior-y: none;

  @media screen and (max-width: 1023px) {
    width: 100vw;
  }
`;

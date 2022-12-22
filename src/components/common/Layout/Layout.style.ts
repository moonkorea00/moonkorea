import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-width: 360px;
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

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    width: 100vw;
    padding: 10px 25px;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 10px 20px;
  }
`;

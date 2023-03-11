import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-width: 320px;
  min-height:100vh;
`;

export const Main = styled.main`
  display: flex;
  width: 100%;
`;

export const Article = styled.article`
  width: calc(100vw - 320px);
  padding: 25px 50px;
  line-height: 35px;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    padding: 10px 25px;
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 10px 10px;
    line-height: 32px;
  }
`;

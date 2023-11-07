import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 50px;
  min-width: 280px;
  padding-bottom: 50px;
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-width: 280px;
  line-height: 35px;
  animation: fade-in 0.25s;

  @keyframes fade-in {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 14px;
  }
`;

export const ChildrenContainer = styled.div`
  min-width: 280px;
  max-width: 700px;
`;

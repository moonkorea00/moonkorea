import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 700px;
  padding: 40px 20px;
  min-width: 280px;
  line-height: 35px;
  animation: fade-in 0.7s;

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

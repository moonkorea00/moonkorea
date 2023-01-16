import styled from 'styled-components';

export const Container = styled.section`
  min-width: 320px;
  animation: fade-in 0.25s;

  @keyframes fade-in {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
`;

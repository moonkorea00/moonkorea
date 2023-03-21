import styled from 'styled-components';
import { colors } from '@styles/colors';

interface ContainerProps {
  type?: string;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  ${({ theme, type }) =>
    type === 'toast' ? theme.flexCenterEnd : theme.flexCenter}
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${({ type }) => type === 'toast' && '0 20px'};
  background-color: ${({ type }) => (type ? 'inherit' : colors.overlay)};
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

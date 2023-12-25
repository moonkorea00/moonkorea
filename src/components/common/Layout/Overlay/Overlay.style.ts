import type { OverlayType } from './Overlay';

import styled, { css } from 'styled-components';

interface OverlayContainerProps {
  type: OverlayType;
}

const overlayStyle = {
  backdrop: css`
    ${({ theme }) => css`
      ${theme.flexCenter}
      background-color: ${theme.colors.overlay};
    `}
  `,
  toast: css`
    ${({ theme }) => css`
      ${theme.flexCenterEnd}
      padding: 0 20px;
    `}
  `,
};

export const Container = styled.div<OverlayContainerProps>`
  ${({ type }) => overlayStyle[type]}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

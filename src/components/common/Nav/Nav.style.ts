import styled, { css } from 'styled-components';

interface NavStyleProps {
  isHeaderInView: boolean;
}

export const Container = styled.nav<NavStyleProps>`
  ${({ theme, isHeaderInView }) => css`
    position: ${isHeaderInView ? 'fixed' : 'absolute'};
    border-bottom: ${isHeaderInView
      ? `1px solid ${theme.colors.base.gray300}`
      : 'none'};
    color: ${isHeaderInView
      ? `${theme.colors.base.gray700}`
      : `${theme.colors.base.white}`};
    background-color: ${isHeaderInView
      ? `${theme.colors.base.white}`
      : 'inherit'};
    opacity: ${isHeaderInView ? '0.8' : '1'};
  `}
  top: 0;
  left: 0;
  right: 0;
  min-width: 280px;
  transition: all ease 0.25s;

  &:hover {
    opacity: 1;
  }
`;

export const FlexContainer = styled.div`
  ${({ theme }) => theme.flexSpaceBetween}
  width: 85%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const NavItemsContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
  height: 52px;
  gap: 12px;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    gap: 8px;
    font-size: 0.85em;
  }
`;

export const NavItem = styled.span`
  color: inherit;
  font-size: inherit;
  font-weight: 700;
  cursor: pointer;
`;

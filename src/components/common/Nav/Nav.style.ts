import styled from 'styled-components';
import { colors } from '@styles/colors';

interface NavStyleProps {
  isIntersected: boolean;
}

export const Container = styled.nav<NavStyleProps>`
  position: ${({ isIntersected }) => (isIntersected ? 'fixed' : 'absolute')};
  border-bottom: ${({ isIntersected }) =>
    isIntersected ? `1px solid ${colors.gray300}` : 'none'};
  color: ${({ isIntersected }) =>
    isIntersected ? `${colors.gray700}` : 'white'};
  background-color: ${({ isIntersected }) =>
    isIntersected ? 'white' : 'inherit'};
  top: 0;
  left: 0;
  right: 0;
  min-width: 280px;
  opacity: 0.85;
  transition: all ease 0.25s;

  &:hover {
    opacity: 1;
  }
`;

export const FlexBox = styled.div<NavStyleProps>`
  ${({ theme }) => theme.flexSpaceBetween}
  width: 85%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const LogoContainer = styled.nav<NavStyleProps>`
  ${({ theme }) => theme.flexCenter};
  gap: 10px;
  color: ${({ isIntersected }) =>
    isIntersected ? `${colors.gray700}` : 'white'};
  font-weight: 700;

  @media screen and (max-width: 768px) {
    gap: 7px;
    font-size: 0.9em;
  }
`;

export const BlogName = styled.span`
  color: inherit;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBar = styled.ul`
  display: inline-flex;
  gap: 12px;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    gap: 8px;
    font-size: 0.85em;
  }
`;

export const NavItem = styled.li`
  list-style: none;
  cursor: pointer;
`;

export const Style = {
  color: 'inherit',
};

import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.header`
  ${({ theme }) => theme.flexSpaceBetween};
  width: 100%;
  height: 54px;
  padding: 0 50px;
  border-bottom: 1px solid #d3d3d3;
  opacity: 0.85;
  transition: all ease 0.25s;

  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 1024px) {
    padding: 0 25px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const LogoContainer = styled.nav`
  ${({ theme }) => theme.flexCenter};
`;

export const Favicon = styled.img`
  width: 25px;
  min-width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const BlogTitle = styled.span`
  margin-left: 8px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

export const LinkContainer = styled.nav`
  ${({ theme }) => theme.flexCenter};
  gap: 14px;
`;

export const MenuIcon = styled.div`
  display: none;
  height: 100%;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 1024px) {
    display: block;
  }
`;

export const IconContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray100};
  }
`;

export const Copyright = styled.span`
  font-size: 14px;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const customIconStyle = {
  size: '18',
  color: `${colors.black}`,
  cursor: 'pointer',
};

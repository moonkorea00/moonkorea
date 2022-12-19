import styled from 'styled-components';

export const Container = styled.header`
  ${({ theme }) => theme.flexSpaceBetween};
  width: 100%;
  height: 54px;
  padding: 0 40px;
  border-bottom: 1px solid #D3D3D3;
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
  margin-top: 2px;
`;

export const Copyright = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const customIconStyle = {
  size: '18',
  color: 'black',
  cursor: 'pointer',
};

import styled from 'styled-components';

export const HeaderContainer = styled.header`
  ${({ theme }) => theme.flexSpaceBetween};
  height: 7vh;
  padding: 0 3vw;
  border-bottom: 1px solid lightgrey;
`;

export const LogoContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
`;

export const Favicon = styled.img`
  width: 25px;
  min-width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const BlogTitle = styled.span`
  margin-left: 0.5vw;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

export const Links = styled.div`
  ${({ theme }) => theme.flexCenter};
  gap: 1vw;
  height: 7vh;
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

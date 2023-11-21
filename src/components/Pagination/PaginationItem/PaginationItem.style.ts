import styled, { css } from 'styled-components';

interface PaginationItemProps {
  isActive: boolean;
}

export const Page = styled.li<PaginationItemProps>`
  ${({ theme }) => theme.flexCenter}
  width: 30px;
  height: 30px;
  color: black;

  ${({ theme, isActive }) => css`
    background-color: ${isActive ? theme.colors.base.gray200 : 'white'};
    font-weight: ${isActive ? 600 : 400};
    text-decoration: ${isActive ? 'none' : 'underline'};
  `}
  
  border-radius: 8px;
  list-style: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, isActive }) =>
      !isActive && theme.colors.base.gray100};
  }
`;

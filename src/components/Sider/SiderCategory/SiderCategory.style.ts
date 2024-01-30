import styled, { css } from 'styled-components';

interface TitleProps {
  isActive: boolean;
}

interface NavItemContainerProps {
  isCategoryOpen: boolean;
  height: number;
}

export const Container = styled.ul`
  ${({ theme }) => theme.flexColumn};
  gap: 6px;
  padding: 0;
  margin: 0;
`;

export const CategoryContainer = styled.div`
  ${({ theme }) => theme.flexDefault};
`;

export const Category = styled.span<TitleProps>`
  margin-left: 10px;
  font-size: 0.9em;
  font-weight: ${({ isActive }) => isActive && '800'};
  cursor: pointer;
`;

export const TotalPosts = styled.span`
  margin-left: 2px;
  font-size: 14px;
`;

export const CategoryItemContainer = styled.div<NavItemContainerProps>`
  ${({ isCategoryOpen, height }) => css`
    height: ${isCategoryOpen ? `${height}px` : '0px'};
    opacity: ${isCategoryOpen ? '1' : '0.1'};
  `}
  transition: all 0.25s ease-in-out;
  overflow: hidden;
`;

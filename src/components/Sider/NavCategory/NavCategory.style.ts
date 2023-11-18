import styled from 'styled-components';

interface TitleProps {
  isActive: boolean;
}

interface NavItemContainerProps {
  isSubCategoryOpen: boolean;
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

export const Title = styled.span``;

export const CategoryItem = styled.span<TitleProps>`
  margin-left: 10px;
  font-size: 0.9em;
  font-weight: ${({ isActive }) => isActive && '900'};
  cursor: pointer;
`;

export const TotalPosts = styled.span`
  margin-left: 2px;
  font-size: 14px;
`;

export const NavItemContainer = styled.div<NavItemContainerProps>`
  height: ${({ isSubCategoryOpen, height }) =>
    isSubCategoryOpen ? `${height}px` : '0px'};
  transition: height 0.25s ease-in-out;
  overflow: hidden;
`;

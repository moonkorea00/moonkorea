import styled from 'styled-components';

interface TitleProps {
  condition: boolean;
}

interface NavItemContainerProps {
  isSubCategoryOpen: boolean;
  height: number;
}

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn};
  margin-bottom: 6px;
`;

export const CategoryContainer = styled.div`
  ${({ theme }) => theme.flexDefault};
  margin-bottom: 4px;
`;

export const Title = styled.span``;

export const CategoryItem = styled.span<TitleProps>`
  margin-left: 10px;
  font-size: 0.9em;
  font-weight: ${({ condition }) => condition && '900'};
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

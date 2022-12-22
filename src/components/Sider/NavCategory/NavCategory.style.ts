import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn};
  margin-bottom: 6px;
`;

export const CategoryContainer = styled.div`
  ${({ theme }) => theme.flexDefault};
  margin-bottom: 4px;
`;

export const CategoryItem = styled.span`
  margin-left: 10px;
  font-weight: ${({ condition }: { condition: boolean }) => condition && '900'};
  cursor: pointer;
`;

export const TotalPosts = styled.span`
  margin-left: 2px;
  font-size: 14px;
`;

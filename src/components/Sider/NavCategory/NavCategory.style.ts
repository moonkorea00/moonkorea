import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flexColumn};
  margin-bottom: 1.8vh;
`;

export const CategoryContainer = styled.div`
  ${({ theme }) => theme.flexDefault};
  margin-bottom: 0.5vh;
`;

export const TriangleIcon = styled.img`
  width: 7px;
  height: 7px;

  transform: ${({ condition }: { condition: boolean }) =>
    condition ? '' : 'rotate(-90deg)'};

  transition: all ease 0.3s;
  cursor: pointer;
`;

export const CategoryItem = styled.span`
  margin-left: 0.6vw;
  font-weight: ${({ condition }: { condition: boolean }) => condition && '900'};
  cursor: pointer;
`;

export const TotalPosts = styled.span`
  margin-left: 2px;
  font-size: 14px;
`;

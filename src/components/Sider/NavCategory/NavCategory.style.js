import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flexCustom('column', null, null)};
  margin-bottom: 1.8vh;
`;

export const CategoryContainer = styled.div`
  ${({ theme }) => theme.flexCustom(null, null, 'center')};
  margin-bottom: 0.5vh;
`;

export const TriangleIcon = styled.img`
  width: 7px;
  height: 7px;

  transform: ${({ isSubCategoryOpen }) =>
    isSubCategoryOpen ? '' : 'rotate(-90deg)'};

  transition: all ease 0.3s;
  cursor: pointer;
`;

export const CategoryItem = styled.span`
  margin-left: 0.6vw;
  font-weight: ${({ condition }) => condition && '900'};
  cursor: pointer;
`;

export const TotalPosts = styled.span`
  margin-left: 2px;
  font-size: 14px;
`;

export const PostContainer = styled.div`
  ${({ theme }) => theme.flexCustom(null, null, 'center')};
  padding-left: 1.2vw;
  margin-bottom: 0.3vh;

  ${({ isPostSelected }) =>
    isPostSelected &&
    css`
      margin-left: 0.3vw;
      border-radius: 4px;
      font-weight: 500;
      background-color: rgb(235, 235, 235);
      color: black;
      transition: all ease 0.5s;
    `}

  &:hover {
    border-radius: 4px;
    color: black;
    background-color: rgb(235, 235, 235);
    transition: all ease 0.5s;
  }
`;

export const PostTitle = styled.div`
  padding: 0.8vh 0 0.8vh 0.5vw;
  font-size: 14px;
  line-height: 25px;
  color: #364149;
  cursor: pointer;
`;

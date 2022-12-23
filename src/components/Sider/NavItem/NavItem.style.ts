import styled, { css } from 'styled-components';

export const Container = styled.nav`
  ${({ theme }) => theme.flexDefault};
  padding-left: 12px;
  margin-bottom: 3px;

  ${({ isPostSelected }: { isPostSelected: boolean }) =>
    isPostSelected &&
    css`
      margin-left: 4px;
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
  padding: 7px 0 7px 10px;
  font-size: 14px;
  line-height: 25px;
  color: #364149;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    line-height: 20px;
  }
`;

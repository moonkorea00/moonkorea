import styled, { css } from 'styled-components';

interface ContainerProps {
  isPostSelected: boolean;
}

export const Container = styled.nav<ContainerProps>`
  ${({ theme }) => theme.flexDefault};
  padding-left: 12px;

  ${({ isPostSelected }) =>
    isPostSelected &&
    css`
      margin-left: 4px;
      border-radius: 4px;
      font-weight: 500;
      background-color: ${({ theme }) => theme.colors.base.gray200};
      color: black;
    `}

  &:hover {
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.base.black};
    background-color: ${({ theme }) => theme.colors.base.gray200};
    transition: all ease 0.5s;
  }
`;

export const PostTitle = styled.div`
  padding: 7px 0 7px 10px;
  font-size: 14px;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.base.gray800};
  cursor: pointer;

  @media screen and (max-width: 768px) {
    line-height: 20px;
  }
`;

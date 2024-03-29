import styled, { css } from 'styled-components';

interface ContainerProps {
  isSiderItemActive: boolean;
}

export const Container = styled.li<ContainerProps>`
  ${({ theme }) => theme.flexDefault};
  padding-left: 12px;

  ${({ isSiderItemActive }) =>
    isSiderItemActive &&
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
  word-break: keep-all;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    line-height: 20px;
  }
`;

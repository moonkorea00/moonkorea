import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn}
`;

export const TotalPosts = styled.p`
  align-self: end;
  margin-bottom: -6px;
  color: ${({ theme }) => theme.colors.base.gray700};
  font-size: 0.9em;

  @media screen and (max-width: 768px) {
    font-size: 0.8em;
  }
`;

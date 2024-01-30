import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flexColumn}
  max-width: 800px;
  height: 100%;
  padding: 50px 20px;
  word-break: keep-all;
`;

export const Title = styled.h1`
  margin-bottom: -10px;
  font-size: 42px;
  font-weight: 900;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

export const Description = styled.p`
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.8px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Date = styled.div`
  align-self: flex-end;
  font-size: 0.85em;
`;

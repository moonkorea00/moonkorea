import styled from 'styled-components';

export const Container = styled.section`
  position: relative;
  ${({ theme }) => theme.flexColumn};
  width: 100%;
  min-height: 300px;
  max-height: 800px;
  background-color: ${({ theme }) => theme.colors.secondary.light};
`;

export const HeaderContainer = styled.header`
  ${({ theme }) => theme.flexCenter}
  min-height: 300px;
  max-height: 700px;
  background-color: ${({ theme }) => theme.colors.secondary.light};
  color: ${({ theme }) => theme.colors.base.white};
`;

export const Heading = styled.h1`
  font-size: 70px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.base.white};
  text-align: center;

  @media screen and (max-width: 1024px) {
    font-size: 55px;
  }

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;
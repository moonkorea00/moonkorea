import styled from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => theme.flexColumnCenter};
  width: 100vw;
  height: 90vh;
`;

export const Logo = styled.img`
  height: 300px;
  width: 350px;
  min-width: 200px;
  margin-bottom: 5vh;
`;

export const RedirectButton = styled.button`
  padding: 4px 18px;
  margin-top: 1vh;
  font-weight: 600;
  border-radius: 14px;

  &:hover {
    background-color: rgb(235, 235, 235);
  }
`;

import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumnCenter};
  height: calc(90vh - 54px);
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
`;

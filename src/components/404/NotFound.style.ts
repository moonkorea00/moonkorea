import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumnCenter};
  padding: 26px 0;
`;

export const RedirectButton = styled.button`
  padding: 8px 18px;
  margin-top: 1vh;
  font-weight: 600;
  border-radius: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.gray300};
  }
`;

import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexCenter}
  gap: 30px;
  margin: 40px;
`;

export const PaginationList = styled.ul`
  ${({ theme }) => theme.flexAlignCenter}
  padding:0;
  gap: 16px;
`;

export const PaginateButton = styled.button`
  padding: 6px;
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.base.gray100};
  border: 1px solid ${({ theme }) => theme.colors.base.gray200};
  border-radius: 8px;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.base.gray200};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const PaginatePrevButton = styled(PaginateButton)``;

export const PaginateNextButton = styled(PaginateButton)``;

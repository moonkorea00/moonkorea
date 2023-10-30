import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumnCenter};
  gap: 10px;
  width: 100%;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.base.gray200};
  border-radius: 6px;

  @media screen and (max-width: 768px) {
    gap: 0;
    padding: 28px 36px;
  }
`;

export const FallbackMessage = styled.p`
  @media screen and (max-width: 768px) {
    font-size: 0.95em;
  }
`;

export const FallbackButton = styled.button`
  padding: 6px 8px;
  background-color: ${({ theme }) => theme.colors.base.gray300};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.gray200};
  }

  @media screen and (max-width: 768px) {
    font-size: 0.75em;
  }
`;

import styled from 'styled-components';

export const OAuthButton = styled.button`
  ${({ theme }) => theme.flexAlignCenter}
  display: flex;
  align-items: center;
  width: 240px;
  padding: 3px 10px;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.base.gray200};
  border-radius: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.gray300};
  }
`;

export const OAuthText = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

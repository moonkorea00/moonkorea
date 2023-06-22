import styled from 'styled-components';
import { colors } from '@styles/colors';

export const OAuthButton = styled.button`
  ${({ theme }) => theme.flexAlignCenter}
  display: flex;
  align-items: center;
  width: 240px;
  padding: 3px 10px;
  gap: 20px;
  background-color: ${colors.gray200};
  border-radius: 24px;

  &:hover {
    background-color: ${colors.gray300};
  }
`;

export const OAuthText = styled.span`
  font-size: 14px;
  font-weight: 700;
`;
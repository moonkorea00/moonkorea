import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.div<{ scrollDirection: 'up' | 'down' | null }>`
  position: absolute;
  top: 56px;
  right: 56px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 28px 20px 18px;
  border: 1px solid ${colors.gray300};
  border-radius: 8px;
  background-color: white;
  z-index: 1;

  @media screen and (max-width: 1024px) {
    top: -100px;
    right: 0;
  }
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: -6px;
  right: 2px;
`;

export const CloseButton = styled.button`
  color: ${colors.gray600};
  background-color: inherit;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    background-color: ${colors.gray100};
  }
`;

export const CloseButtonLabel = styled.span`
  font-size: 12px;
`;

export const KakaoShareButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: inherit;
`;

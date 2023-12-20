import styled from 'styled-components';

export const Container = styled.div<{ scrollDirection: 'up' | 'down' | null }>`
  position: absolute;
  top: 56px;
  right: 56px;
  padding: 28px 20px 18px;
  border: 1px solid ${({ theme }) => theme.colors.base.gray300};
  border-radius: 8px;
  background-color: white;
  z-index: 1;

  @media screen and (max-width: 1024px) {
    top: -150px;
    right: 0;
  }
`;

export const ShareIconContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: -6px;
  right: 2px;
`;

export const CloseButton = styled.button`
  color: ${({ theme }) => theme.colors.base.gray600};
  background-color: inherit;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.gray100};
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

export const KakaoIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const CopyURLContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 190px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.base.gray200};
  border-radius: 6px;

  input {
    width: 100%;
    border: none;
  }
`;

export const CopyURLButton = styled.button`
  background-color: inherit;
  padding-left: 0;
`;

export const CopyURLIcon = styled.img`
  width: 18px;
  height: 18px;
`;

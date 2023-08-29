import styled from 'styled-components';

interface FaviconContainerProps {
  isOAuthServerLoading: boolean;
}

export const Container = styled.section`
  position: relative;
  ${({ theme }) => theme.flexColumnCenter}
  width: 290px;
  min-width: 270px;
  height: 500px;
  gap: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.base.white};
  box-shadow: 2px 2px 6px ${({ theme }) => theme.colors.shadow.default};
  animation: fadeIn 0.2s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0.1;
      transform: translate3d(0, -5%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 12px 0 0;
`;

export const CloseButton = styled.button`
  padding: 2px 6px;
  background-color: inherit;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.gray200};
  }
`;

export const HeadingContainer = styled.div`
  ${({ theme }) => theme.flexColumnCenter}
  gap: 16px;
  margin-bottom: 56px;
`;

export const FaviconContainer = styled.div<FaviconContainerProps>`
  animation: ${({ isOAuthServerLoading }) =>
    isOAuthServerLoading && 'flicker 0.7s infinite alternate;'};

  @keyframes flicker {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.1;
    }
  }
`;

export const Text = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

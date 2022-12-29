import styled from 'styled-components';

export const ChatSupportIconContainer = styled.div`
  position: fixed;
  right: 50px;
  bottom: 50px;
  transition: all 0.3s ease;
  animation: fade-in 1.25s;

  @media screen and (max-width: 968px) {
    opacity: ${({ isChatSupportVisible }: { isChatSupportVisible: boolean }) =>
      isChatSupportVisible ? '1' : '0'};
  }

  @keyframes fade-in {
    0% {
      opacity: 0.1;
    }
    20% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
`;

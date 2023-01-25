import styled from 'styled-components';

export const ViewPortContainer = styled.div`
  position: fixed;
  ${({ theme }) => theme.flexCenter}
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.17);
`;

export const ModalContainer = styled.div`
  position: relative;
  ${({ theme }) => theme.flexColumnCenter}
  width: 290px;
  min-width: 270px;
  height: 500px;
  gap: 16px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 2px 2px 6px rgb(173, 173, 173);
`;

export const ModalHeadingContainer = styled.div`
  ${({ theme }) => theme.flexColumnCenter}
  gap: 16px;
  margin-bottom: 56px;
`;

export const Text = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

export const OAuthButton = styled.button`
  ${({ theme }) => theme.flexAlignCenter}
  display: flex;
  align-items: center;
  width: 240px;
  padding: 3px 10px;
  gap: 20px;
  background-color: rgb(239, 239, 239);
  border-radius: 24px;

  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

export const OAuthText = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

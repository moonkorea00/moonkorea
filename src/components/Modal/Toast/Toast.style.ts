import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSpaceBetween}
  padding: 0 26px;
  width: 400px;
  height: 70px;
  gap: 16px;
  border-radius: 8px;
  color: white;
  background-color: #323232;
  box-shadow: 2px 2px 6px rgb(230, 230, 230);
  transform: translateY(-100%);

  @media screen and (max-width: 768px) {
    width: 280px;
    min-width: 280px;
    padding: 0 14px;
    font-size: 15px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

export const Button = styled.button`
  font-size: 14px;
  color: ${({ action }: { action?: string }) =>
    action === 'delete' ? '#D32F2E' : 'white'};
  background-color: inherit;
`;
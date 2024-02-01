import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flexColumnCenter}
  gap: 20px;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

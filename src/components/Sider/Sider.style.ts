import styled from 'styled-components';

interface ContainerProps {
  isSiderVisible: boolean;
}

export const Container = styled.nav<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  max-width: 325px;
  min-width: 310px;
  height: 100%;
  padding: 0px 0px 30px 20px;
  line-height: 35px;
  background-color: ${({ theme }) => theme.colors.base.grayDefault};
  border-left: 1px solid ${({ theme }) => theme.colors.base.gray300};
  transition: transform 0.25s ease-in-out;
  transform: ${({ isSiderVisible }) =>
    isSiderVisible ? 'translateX(0)' : 'translateX(-100%)'};
  overflow-y: scroll;
  overscroll-behavior-y: none;
  z-index: 1;
`;

export const CloseButton = styled.button`
  position: sticky;
  top: 6px;
  left: 310px;
  margin: 6px 8px 0 0;
  padding: 2px 6px;
  background-color: inherit;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.gray200};
  }
`;

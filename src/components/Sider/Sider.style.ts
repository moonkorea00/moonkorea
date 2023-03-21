import styled from 'styled-components';
import { colors } from '@styles/colors';

interface ContainerProps {
  isSiderVisible: boolean;
}

export const Container = styled.aside<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  max-width:325px;
  min-width: 310px;
  height: 100%;
  padding: 16px 16px 30px 20px;
  line-height: 35px;
  background-color: ${colors.grayDefault};
  border-left: 1px solid ${colors.gray300};
  transition: transform 0.25s ease-in-out;
  transform: ${({ isSiderVisible }) =>
    isSiderVisible ? 'translateX(0)' : 'translateX(-100%)'};
  overflow-y: scroll;
  overscroll-behavior-y: none;
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
    background-color: ${colors.gray200};
  }
`;

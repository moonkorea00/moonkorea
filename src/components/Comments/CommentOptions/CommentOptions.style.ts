import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  ${({ theme }) => theme.flexColumnCenter}
  width: 100px;
  padding: 4px 0px 4px;
  background: ${colors.white};
  border: 1px solid ${colors.gray100};
  border-radius: 8px;
  box-shadow: 0 5px 16px ${colors.boxShadow};
  z-index: 1;

  @media screen and (max-width: 768px) {
    right: -4px;
  }
`;

export const Option = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  color: ${colors.blue};
  font-weight: 500;
  background-color: inherit;
  border-bottom: 1px solid ${colors.gray100};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    font-weight: 700;
  }
`;

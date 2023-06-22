import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn}
  margin-bottom: 10px;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid ${colors.gray100};
  border-radius: 6px;
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

export const EditInput = styled(Input)`
  min-height: 120px;
  padding: 4px;
  line-height: 26px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ActionButton = styled.button`
  width: 100px;
  height: 34px;
  background-color: ${colors.blue};
  color: ${colors.white};
  font-size: 1em;
  font-weight: 500;
  border-radius: 6px;

  &:hover {
    background-color: ${colors.darkBlue};
  }

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 32px;
    font-size: 0.9em;
  }
`;

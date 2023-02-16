import styled from 'styled-components';

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
  border: 1px solid #f0f3f5;
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

export const SubmitButton = styled.button`
  width: 88px;
  height: 34px;
  background-color: #4081c4;
  color: white;
  font-size: 1em;
  font-weight: 500;
  border-radius: 6px;

  &:hover {
    background-color: rgb(60, 122, 183);
  }

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 32px;
    font-size: 0.9em;
  }
`;

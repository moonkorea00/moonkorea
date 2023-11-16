import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn}
  margin-bottom: 10px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.base.gray100};
  border-radius: 6px;
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
`;

export const CommentEditInput = styled(CommentInput)`
  min-height: 120px;
  padding: 4px;
  line-height: 26px;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ActionButton = styled.button`
  width: 100px;
  height: 34px;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.base.white};
  font-size: 1em;
  font-weight: 500;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }

  &:not(:disabled)&:active {
    transform: translateY(1px);
  }

  &:focus {
    outline-offset: 2px;
  }

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 32px;
    font-size: 0.9em;
  }
`;

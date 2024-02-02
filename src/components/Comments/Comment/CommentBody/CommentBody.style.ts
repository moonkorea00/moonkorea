import styled from 'styled-components';

export const CommentBody = styled.div<{ isDeleted: boolean }>`
  font-size: 0.95em;
  line-height: 26px;
  color: ${({ isDeleted, theme }) => isDeleted && theme.colors.base.gray700};
`;

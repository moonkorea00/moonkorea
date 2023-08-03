import styled from 'styled-components';

export const Container = styled.section`
  min-height: 300px;
  min-width: 280px;
  margin-top: 30px;
`;

export const CommentCount = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

export const CommentSectionPlaceholder = styled(Container)<{
  isIntersected: boolean;
}>`
  min-height: ${({ isIntersected }) => (isIntersected ? '5px' : '600px')};
`;

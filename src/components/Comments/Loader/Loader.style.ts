import styled, { css } from 'styled-components';
import { Container, CommentCount } from '../CommentSection.style';
import { Container as CommentFormContainer } from '../CommentForm/CommentForm.style';

const PlaceholderMixin = css`
  background-color: ${({ theme }) => theme.colors.base.gray100};
  border-radius: 6px;
`;

export const ContainerPlaceholder = styled(Container)``;

export const CommentCountPlaceholder = styled(CommentCount)`
  ${PlaceholderMixin};
  height: 28px;
  width: 66px;
`;

export const FormPlaceholder = styled(CommentFormContainer)`
  ${PlaceholderMixin};
  min-height: 120px;
`;

export const ButtonContainerPlaceholder = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonPlaceholder = styled.div`
  ${PlaceholderMixin};
  width: 100px;
  height: 34px;
`;

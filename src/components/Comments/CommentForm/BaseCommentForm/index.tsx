import type { FormEvent, PropsWithChildren } from 'react';
import * as S from '../CommentForm.style';

interface BaseCommentFormProps {
  onSubmit: () => void;
  isFormModeCancellable?: boolean;
  setFormToDefaultMode: () => void;
  isSubmitButtonDisabled?: boolean;
  submitButtonLabel: string;
}

const BaseCommentForm = ({
  children,
  onSubmit,
  isFormModeCancellable,
  setFormToDefaultMode,
  isSubmitButtonDisabled,
  submitButtonLabel,
}: PropsWithChildren<BaseCommentFormProps>) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        {children}
        <S.ActionButtonContainer>
          {isFormModeCancellable && (
            <S.ActionButton onClick={setFormToDefaultMode}>취소</S.ActionButton>
          )}
          <S.ActionButton type="submit" disabled={isSubmitButtonDisabled}>
            {submitButtonLabel}
          </S.ActionButton>
        </S.ActionButtonContainer>
      </form>
    </S.Container>
  );
};

export default BaseCommentForm;

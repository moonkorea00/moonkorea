import type { FormEvent, ReactNode } from 'react';
import * as S from '../CommentForm.style';

interface BaseCommentFormProps {
  children?: ReactNode;
  onSubmit: () => void;
  isFormModeCancellable?: boolean;
  setFormToDefaultMode: () => void;
  isButtonDisabled?: boolean;
  submitButtonLabel: string;
}

const BaseCommentForm = ({
  children,
  onSubmit,
  isFormModeCancellable,
  setFormToDefaultMode,
  isButtonDisabled,
  submitButtonLabel,
}: BaseCommentFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        {children}
        <S.ButtonContainer>
          {isFormModeCancellable && (
            <S.ActionButton onClick={setFormToDefaultMode}>취소</S.ActionButton>
          )}
          <S.ActionButton type="submit" disabled={isButtonDisabled}>
            {submitButtonLabel}
          </S.ActionButton>
        </S.ButtonContainer>
      </form>
    </S.Container>
  );
};

export default BaseCommentForm;

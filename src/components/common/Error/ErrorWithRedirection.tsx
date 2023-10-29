import type { ReactNode } from 'react';
import * as S from './ErrorWithRedirection.style';
import Link from 'next/link';

interface ErrorWithRedirectionProps {
  href?: string;
  label?: string;
  children: ReactNode;
}

const ErrorWithRedirection = ({
  href = '/',
  label = '홈으로 돌아가기',
  children,
}: ErrorWithRedirectionProps) => {
  return (
    <S.Container>
      {children}
      <Link href={href} replace>
        <S.RedirectButton>{label}</S.RedirectButton>
      </Link>
    </S.Container>
  );
};

export default ErrorWithRedirection;

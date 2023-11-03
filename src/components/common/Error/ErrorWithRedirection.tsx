import * as S from './ErrorWithRedirection.style';
import Link from 'next/link';

interface ErrorWithRedirectionProps {
  href?: string;
  label?: string;
}

const ErrorWithRedirection = ({
  href = '/',
  label = '홈으로 돌아가기',
  children,
}: PropsWithStrictChildren<ErrorWithRedirectionProps>) => {
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

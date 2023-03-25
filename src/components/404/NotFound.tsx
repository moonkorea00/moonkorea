import * as S from './NotFound.style';
import Link from 'next/link';

const NotFound = () => {
  return (
    <S.Container>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link href="/" replace>
        <S.RedirectButton>홈으로 돌아가기</S.RedirectButton>
      </Link>
    </S.Container>
  );
};

export default NotFound;

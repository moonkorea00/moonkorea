import * as S from './NotFound.style';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/assets/favicon/moonkorea.png';

const NotFound = () => {
  return (
    <S.Container>
      <Image
        src={logo}
        alt="moonkorea"
        width={300}
        height={300}
        layout="intrinsic"
      />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link href="/" replace>
        <S.RedirectButton>홈으로 돌아가기</S.RedirectButton>
      </Link>
    </S.Container>
  );
};

export default NotFound;

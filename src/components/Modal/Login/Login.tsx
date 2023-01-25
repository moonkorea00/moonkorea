import * as S from './Login.style';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import favicon from 'public/assets/favicon/moonkorea.png';
import { OAUTH_LOGIN_DATA } from '@constants/OAUTH_LOGIN_DATA';

const LoginModal = () => {
  return (
    <S.ViewPortContainer>
      <S.ModalContainer>
        <S.ModalHeadingContainer>
          <Image src={favicon} alt="moonkorea" width={50} height={50} />
          <S.Text>로그인</S.Text>
        </S.ModalHeadingContainer>
        {OAUTH_LOGIN_DATA.map(({ platform, img_src, alt, text }) => {
          return (
            <S.OAuthButton onClick={() => signIn(platform)}>
              <Image src={img_src} alt={alt} width={40} height={40} />
              <S.OAuthText>{text}</S.OAuthText>
            </S.OAuthButton>
          );
        })}
      </S.ModalContainer>
    </S.ViewPortContainer>
  );
};

export default LoginModal;

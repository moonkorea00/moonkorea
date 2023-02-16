import * as S from './Login.style';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import favicon from 'public/assets/favicon/moonkorea.png';
import ModalLayout from '../Layout/ModalLayout';
import { OAUTH_LOGIN_DATA } from '@constants/nextAuth';
import useUnmountIfClickedOutside from '../hooks/useUnmoutIfClickedOutside';

interface LoginModalProps {
  onClose?: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [isOAuthServerLoading, setIsOAuthServerLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useUnmountIfClickedOutside(modalRef, onClose as VoidFunction);

  return (
    <ModalLayout>
      <S.Container ref={modalRef}>
        <S.ButtonWrapper>
          <S.CloseButton onClick={onClose}>&#10005;</S.CloseButton>
        </S.ButtonWrapper>
        <S.HeadingContainer>
          <S.FaviconContainer isOAuthServerLoading={isOAuthServerLoading}>
            <Image src={favicon} alt="moonkorea" width={50} height={50} />
          </S.FaviconContainer>
          <S.Text>로그인</S.Text>
        </S.HeadingContainer>
        {OAUTH_LOGIN_DATA.map(({ platform, img_src, alt, text }, i) => {
          return (
            <S.OAuthButton
              key={i}
              onClick={() => {
                signIn(platform);
                setIsOAuthServerLoading(true);
              }}
            >
              <Image src={img_src} alt={alt} width={40} height={40} />
              <S.OAuthText>{text}</S.OAuthText>
            </S.OAuthButton>
          );
        })}
      </S.Container>
    </ModalLayout>
  );
};

export default LoginModal;

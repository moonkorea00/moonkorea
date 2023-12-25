import { useState } from 'react';
import Image from 'next/image';

import * as S from './Login.style';
import Overlay from '@components/common/Layout/Overlay/Overlay';
import OutsideClickWrapper from '@components/common/OutsideClickWrapper/OutsideClickWrapper';
import OAuthItem from './OAuthItem/OAuthItem';

import favicon from 'public/assets/favicon/moonkorea.png';

interface LoginModalProps {
  onClose?: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [isOAuthServerLoading, setIsOAuthServerLoading] = useState(false);

  return (
    <Overlay type='backdrop'>
      <OutsideClickWrapper onClickHandler={onClose as VoidFunction}>
        <S.Container>
          <S.ButtonWrapper>
            <S.CloseButton onClick={onClose}>&#10005;</S.CloseButton>
          </S.ButtonWrapper>
          <S.HeadingContainer>
            <S.FaviconContainer isOAuthServerLoading={isOAuthServerLoading}>
              <Image src={favicon} alt="moonkorea" width={50} height={50} />
            </S.FaviconContainer>
            <S.Text>로그인</S.Text>
          </S.HeadingContainer>
          {OAUTH_LOGIN_DATA.map(({ platform, img_src, alt, text }) => (
            <OAuthItem
              key={platform}
              platform={platform}
              img_src={img_src}
              alt={alt}
              text={text}
              setIsOAuthServerLoading={setIsOAuthServerLoading}
            />
          ))}
        </S.Container>
      </OutsideClickWrapper>
    </Overlay>
  );
};

export default LoginModal;

const OAUTH_LOGIN_DATA = [
  {
    text: 'Google 계정으로 로그인',
    img_src: '/assets/OAuth/google.svg',
    alt: 'google',
    platform: 'google',
  },
  {
    text: 'Github 계정으로 로그인',
    img_src: '/assets/OAuth/github.svg',
    alt: 'github',
    platform: 'github',
  },
  {
    text: 'Facebook 계정으로 로그인',
    img_src: '/assets/OAuth/facebook.svg',
    alt: 'facebook',
    platform: 'facebook',
  },
];

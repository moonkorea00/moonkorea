import type { Dispatch, SetStateAction } from 'react';
import * as S from './OAuthItem.style';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

interface OAuthItemProps {
  platform: string;
  img_src: string;
  alt: string;
  text: string;
  setIsOAuthServerLoading: Dispatch<SetStateAction<boolean>>;
}

const OAuthItem = ({
  platform,
  img_src,
  alt,
  text,
  setIsOAuthServerLoading,
}: OAuthItemProps) => {
  return (
    <S.OAuthButton
      onClick={() => {
        signIn(platform);
        setIsOAuthServerLoading(true);
      }}
    >
      <Image src={img_src} alt={alt} width={40} height={40} />
      <S.OAuthText>{text}</S.OAuthText>
    </S.OAuthButton>
  );
};

export default OAuthItem;

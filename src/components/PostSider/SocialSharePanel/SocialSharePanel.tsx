import type { Dispatch, SetStateAction } from 'react';
import type { MetaData } from '@@types/metaData';
import * as S from './SocialSharePanel.style';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { assets } from '@utils/assetsPath';

interface ShareSocialsProps {
  metaData: MetaData;
  setIsSocialSharePanelVisible: Dispatch<SetStateAction<boolean>>;
  scrollDirection: 'up' | 'down' | null;
}

const SocialSharePanel = ({
  metaData,
  setIsSocialSharePanelVisible,
  scrollDirection,
}: ShareSocialsProps) => {
  const SocialShareRef = useRef<HTMLDivElement>(null);
  const { asPath } = useRouter();

  const fullURL = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${asPath}`;

  const onShareWithKakao = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: metaData.title,
        description: metaData.excerpt,
        imageUrl: process.env.NEXT_PUBLIC_IMG_URL,
        link: {
          mobileWebUrl: process.env.NEXT_PUBLIC_DOMAIN_URL,
          webUrl: process.env.NEXT_PUBLIC_DOMAIN_URL,
        },
      },
      buttons: [
        {
          title: '블로그 포스트 보러가기',
          link: {
            mobileWebUrl: fullURL,
            webUrl: fullURL,
          },
        },
      ],
    });
  };

  const onCloseModal = () => setIsSocialSharePanelVisible(false);

  const onShareWithKakaoAndCloseModal = () => {
    onCloseModal();
    onShareWithKakao();
  };

  useOnClickOutside(SocialShareRef, onCloseModal);

  return (
    <S.Container ref={SocialShareRef} scrollDirection={scrollDirection}>
      <S.CloseButtonContainer>
        <S.CloseButton onClick={() => setIsSocialSharePanelVisible(false)}>
          <S.CloseButtonLabel>&#10005;</S.CloseButtonLabel>
        </S.CloseButton>
      </S.CloseButtonContainer>
      <FacebookShareButton url={fullURL} onClick={onCloseModal}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={fullURL} onClick={onCloseModal}>
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>
      <S.KakaoShareButton onClick={onShareWithKakaoAndCloseModal}>
        <Image
          src={assets.kakao}
          alt="카카오톡 공유"
          width={40}
          height={40}
          priority={true}
        />
      </S.KakaoShareButton>
    </S.Container>
  );
};

export default SocialSharePanel;

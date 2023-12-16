import type { MetaData } from '@@types/metaData';

import { useRef } from 'react';
import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

import * as S from './SocialSharePanel.style';

import useOnClickOutside from '@hooks/useOnClickOutside';
import { assets } from '@utils/assetsPath';

interface ShareSocialsProps {
  postFrontMatter: MetaData;
  onClose: () => void;
  scrollDirection: 'up' | 'down' | null;
}

const SocialSharePanel = ({
  postFrontMatter,
  onClose,
  scrollDirection,
}: ShareSocialsProps) => {
  const SocialShareRef = useRef<HTMLDivElement>(null);
  const { asPath } = useRouter();

  const fullURL = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${asPath}`;

  const onShareWithKakao = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: postFrontMatter.title,
        description: postFrontMatter.excerpt,
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

  const onShareWithKakaoAndCloseModal = () => {
    onShareWithKakao();
    onClose();
  };

  useOnClickOutside(SocialShareRef, onClose);

  return (
    <S.Container ref={SocialShareRef} scrollDirection={scrollDirection}>
      <S.CloseButtonContainer>
        <S.CloseButton onClick={onClose}>
          <S.CloseButtonLabel>&#10005;</S.CloseButtonLabel>
        </S.CloseButton>
      </S.CloseButtonContainer>
      <FacebookShareButton url={fullURL} onClick={onClose}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={fullURL} onClick={onClose}>
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>
      <S.KakaoShareButton onClick={onShareWithKakaoAndCloseModal}>
        <S.KakaoIcon src={assets.kakao} alt="카카오톡 공유" />
      </S.KakaoShareButton>
    </S.Container>
  );
};

export default SocialSharePanel;

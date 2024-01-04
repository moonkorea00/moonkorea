import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

import * as S from './SocialSharePanel.style';
import OutsideClickWrapper from '@components/common/OutsideClickWrapper/OutsideClickWrapper';

import useCopyToClipboard from '@hooks/useCopyToClipboard';

import { assets } from '@utils/assetsPath';

interface ShareSocialsProps {
  title: string;
  excerpt: string;
  onClose: () => void;
  scrollDirection: 'up' | 'down' | null;
}

const SocialSharePanel = ({
  title,
  excerpt,
  onClose,
  scrollDirection,
}: ShareSocialsProps) => {
  const { asPath } = useRouter();
  const { isCopied, onCopy } = useCopyToClipboard();

  const fullURL = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${asPath}`;

  const onShareWithKakao = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: excerpt,
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

  return (
    <OutsideClickWrapper onClickHandler={onClose} triggerKey="Escape">
      <S.Container scrollDirection={scrollDirection}>
        <S.ShareIconContainer>
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
        </S.ShareIconContainer>
        <S.CopyURLContainer>
          <input value={window.location.href} readOnly />
          <S.CopyURLButton
            disabled={isCopied}
            onClick={() => onCopy(window.location.href)}
          >
            <S.CopyURLIcon
              src={isCopied ? assets.check : assets.copy}
              alt="복사"
            />
          </S.CopyURLButton>
        </S.CopyURLContainer>
      </S.Container>
    </OutsideClickWrapper>
  );
};

export default SocialSharePanel;

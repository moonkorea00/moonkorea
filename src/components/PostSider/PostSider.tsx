'use client';

import { useState } from 'react';

import * as S from './PostSider.style';
import SocialSharePanel from './SocialSharePanel/SocialSharePanel';

import { usePrefetchComments } from '@api/hooks/Comments/query';
import useGetElementSizeById from './hooks/useGetElementSizeById';
import useScrollDirection from './hooks/useScrollDirection';
import useSmoothScroll from '@hooks/useSmoothScroll';

import { getPostId } from '@components/Comments/Comments.utils';
import { assets } from '@utils/assetsPath';
import usePreloadImages from '@hooks/usePreloadImages';

interface PostSiderProps {
  title: string;
  description: string;
}

const PostSider = ({ title, description }: PostSiderProps) => {
  const [isSocialSharePanelVisible, setIsSocialSharePanelVisible] =
    useState(false);
  const id = getPostId();

  const prefetchComments = usePrefetchComments(id);
  const onPreloadImages = usePreloadImages([
    assets.kakao_sm,
    assets.copy_sm,
    assets.check_sm,
  ]);
  const { isMounted, height: headerHeight } = useGetElementSizeById('header');
  const onScrollToElement = useSmoothScroll();
  const onCloseSocialSharePanel = () => setIsSocialSharePanelVisible(false);
  const scrollDirection = useScrollDirection({
    screenWidth: 1024,
    scrollUpCallback: onCloseSocialSharePanel,
  });

  const prefetchAndScrollToComments = () => {
    prefetchComments();
    onScrollToElement('comment-section');
  };

  return (
    <S.Container
      isMounted={isMounted}
      headerHeight={headerHeight}
      scrollDirection={scrollDirection}
    >
      <S.SiderButton onClick={prefetchAndScrollToComments}>
        <S.ButtonImageContainer>
          <S.ButtonImage
            src={assets.comment}
            alt="댓글란 바로가기"
            title="댓글"
          />
        </S.ButtonImageContainer>
      </S.SiderButton>
      <S.Seperator />
      <S.SiderButton
        onClick={() => setIsSocialSharePanelVisible(true)}
        onMouseOver={onPreloadImages}
      >
        <S.ButtonImageContainer>
          <S.ButtonImage
            src={assets.share}
            alt="포스트 공유하기"
            title="공유하기"
          />
        </S.ButtonImageContainer>
      </S.SiderButton>
      {isSocialSharePanelVisible && (
        <SocialSharePanel
          title={title}
          description={description}
          onClose={onCloseSocialSharePanel}
          scrollDirection={scrollDirection}
        />
      )}
    </S.Container>
  );
};

export default PostSider;

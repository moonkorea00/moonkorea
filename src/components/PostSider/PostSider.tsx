import type { MetaData } from '@@types/metaData';

import { useState } from 'react';

import * as S from './PostSider.style';
import SocialSharePanel from './SocialSharePanel/SocialSharePanel';

import { usePrefetchComments } from '@api/hooks/Comments/query';
import useGetElementSizeById from './hooks/useGetElementSizeById';
import useScrollDirection from './hooks/useScrollDirection';
import useScrollToElementById from '@hooks/useScrollToElementById';

import { getPostId } from '@components/Comments/Comments.utils';
import { assets } from '@utils/assetsPath';

interface PostSiderProps {
  postFrontMatter: MetaData;
}

const PostSider = ({ postFrontMatter }: PostSiderProps) => {
  const [isSocialSharePanelVisible, setIsSocialSharePanelVisible] =
    useState(false);
  const id = getPostId();

  const prefetchComments = usePrefetchComments(id);
  const { isMounted, height: headerHeight } = useGetElementSizeById('header');
  const onScrollToElement = useScrollToElementById();
  const onCloseSocialSharePanel = () => setIsSocialSharePanelVisible(false);
  const scrollDirection = useScrollDirection({
    screenWidth: 1024,
    scrollUpCallback: onCloseSocialSharePanel,
  });

  const onPrefetchAndScrollToComments = () => {
    prefetchComments();
    onScrollToElement('comment-section');
  };

  return (
    <S.Container
      isMounted={isMounted}
      headerHeight={headerHeight}
      scrollDirection={scrollDirection}
    >
      <S.SiderButton onClick={onPrefetchAndScrollToComments}>
        <S.ButtonImageContainer>
          <S.ButtonImage
            src={assets.comment}
            alt="댓글란 바로가기"
            title="댓글"
          />
        </S.ButtonImageContainer>
      </S.SiderButton>
      <S.Seperator />
      <S.SiderButton onClick={() => setIsSocialSharePanelVisible(true)}>
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
          postFrontMatter={postFrontMatter}
          onClose={onCloseSocialSharePanel}
          scrollDirection={scrollDirection}
        />
      )}
    </S.Container>
  );
};

export default PostSider;

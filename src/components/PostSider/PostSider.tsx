import type { MetaData } from '@@types/metaData';
import * as S from './PostSider.style';
import { useState } from 'react';
import SocialSharePanel from './SocialSharePanel/SocialSharePanel';
import { usePrefetchComments } from '@api/hooks/Comments/query';
import useGetElementSizeById from './hooks/useGetElementSizeById';
import useScrollDirection from './hooks/useScrollDirection';
import useKeyPress from '@hooks/useKeyPress';
import { assets } from '@utils/assetsPath';
import { getPostId } from '@components/Comments/Comments.utils';
import useScrollToElementById from '@hooks/useScrollToElementById';

interface PostSiderProps {
  postFrontMatter: MetaData;
}

const PostSider = ({ postFrontMatter }: PostSiderProps) => {
  const [isSocialSharePanelVisible, setIsSocialSharePanelVisible] =
    useState(false);

  const id = getPostId();
  const prefetchComments = usePrefetchComments(id);

  const { isMounted, height: headerHeight } = useGetElementSizeById('header');
  const scrollDirection = useScrollDirection(1024);

  const onScrollToElement = useScrollToElementById();

  const onPrefetchAndScrollToComments = () => {
    prefetchComments();
    onScrollToElement('comment-section');
  };

  const onCloseSocialSharePanel = () => setIsSocialSharePanelVisible(false);

  useKeyPress({ Escape: onCloseSocialSharePanel });

  return (
    <S.Container
      isMounted={isMounted}
      headerHeight={headerHeight}
      scrollDirection={scrollDirection}
    >
      <S.SiderButton onClick={onPrefetchAndScrollToComments} title="댓글">
        <S.ButtonImageContainer>
          <S.ButtonImage src={assets.comment} />
        </S.ButtonImageContainer>
      </S.SiderButton>
      <S.Seperator />
      <S.SiderButton
        onClick={() => setIsSocialSharePanelVisible(true)}
        title="공유하기"
      >
        <S.ButtonImageContainer>
          <S.ButtonImage src={assets.share} />
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

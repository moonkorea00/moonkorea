import type { MetaData } from '@@types/metaData';
import * as S from './PostSider.style';
import { useState } from 'react';
import SocialSharePanel from './SocialSharePanel/SocialSharePanel';
import { usePrefetchComments } from '@api/hooks/Comments/query';
import useResizeSiderPosition from './hooks/useResizeSiderPosition';
import useScrollDirection from './hooks/useScrollDirection';
import { assets } from '@utils/assetsPath';
import { getPostId } from '@components/Comments/Comments.utils';

interface PostSiderProps {
  metaData: MetaData;
}

const PostSider = ({ metaData }: PostSiderProps) => {
  const [isSocialSharePanelVisible, setIsSocialSharePanelVisible] =
    useState(false);

  const id = getPostId();
  const prefetchComments = usePrefetchComments(id);

  const { isMounted, headerHeight } = useResizeSiderPosition();
  const scrollDirection = useScrollDirection(1024);

  const onPrefetchAndScrollToComments = () => {
    prefetchComments();
    const commentSectionElement = document.getElementById('comment-section');
    commentSectionElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <S.Container
      isMounted={isMounted}
      headerHeight={headerHeight}
      scrollDirection={scrollDirection}
    >
      <S.SiderButton onClick={onPrefetchAndScrollToComments}>
        <S.ButtonImageContainer>
          <S.ButtonImage src={assets.comment} />
        </S.ButtonImageContainer>
      </S.SiderButton>
      <S.Seperator />
      <S.SiderButton onClick={() => setIsSocialSharePanelVisible(true)}>
        <S.ButtonImageContainer>
          <S.ButtonImage src={assets.share} />
        </S.ButtonImageContainer>
      </S.SiderButton>
      {isSocialSharePanelVisible && (
        <SocialSharePanel
          metaData={metaData}
          setIsSocialSharePanelVisible={setIsSocialSharePanelVisible}
          scrollDirection={scrollDirection}
        />
      )}
    </S.Container>
  );
};

export default PostSider;
import type { HomePost } from '@@types/post';

import * as S from './PostList.style';
import PostItem from './PostItem/PostItem';

interface PostListProps {
  posts: HomePost[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <S.Container>
      <S.TotalPosts>
        총 <b>{posts.length}개</b> 포스트
      </S.TotalPosts>
      {posts.map((post: HomePost) => (
        <PostItem key={post.id} {...post} />
      ))}
    </S.Container>
  );
};

export default PostList;

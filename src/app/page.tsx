import Header from '@components/common/Header/Header';
import Home from '@components/Home/Home';

import { getAllPostsSortedByDate, getPostTags } from '@api/post';

const HomePage = async () => {
  const posts = getAllPostsSortedByDate();
  const tags = getPostTags();

  return (
    <>
      <Header />
      <Home posts={posts} tags={tags} />
    </>
  );
};

export default HomePage;

import { Helmet } from 'react-helmet';

const MetaData = ({ post, metaTitle }) => {
  return (
    <Helmet>
      <title>{metaTitle || `${post?.title} - ${post?.category}`}</title>
      <meta
        name="description"
        content={post?.content || 'moonkorea 개발 블로그입니다.'}
        data-react-helmet="true"
      />
    </Helmet>
  );
};

export default MetaData;

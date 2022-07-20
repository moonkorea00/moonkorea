import { Helmet } from 'react-helmet';

const MetaData = props => {
  const { post, metaTitle } = props;
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

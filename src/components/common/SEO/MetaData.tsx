import { Helmet } from 'react-helmet';

interface PostProps {
  id?: number;
  title?: string;
  category?: string;
  content?: string;
}

interface MetaDataProps {
  post?: PostProps;
  metaTitle?: string;
}

const MetaData = ({ post, metaTitle }: MetaDataProps) => {
  return (
    <Helmet>
      <title>{metaTitle || `${post?.title} - ${post?.category}`}</title>
      <meta
        name="description"
        content={
          post?.content?.split('<!--  -->')[1] || 'moonkorea 개발 블로그입니다.'
        }
        data-react-helmet="true"
      />
    </Helmet>
  );
};

export default MetaData;

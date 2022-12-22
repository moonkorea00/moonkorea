import NotFound from '@components/404/NotFound';
import ArticleLayout from '@components/common/ArticleLayout/ArticleLayout';
import SEO from '@components/common/SEO/SEO';

const metaData = {
  title: '404 페이지를 찾을 수 없습니다',
};

const NotFoundPage = () => {
  return (
    <ArticleLayout>
      <SEO metaData={metaData} />
      <NotFound />
    </ArticleLayout>
  );
};

export default NotFoundPage;

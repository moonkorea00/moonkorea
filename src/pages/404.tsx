import NotFound from '@components/404/NotFound';
import Layout from '@components/common/Layout/Layout';
import SEO from '@components/common/SEO/SEO';

const metaData = {
  title: '404 페이지를 찾을 수 없습니다',
};

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO metaData={metaData} />
      <NotFound />
    </Layout>
  );
};

export default NotFoundPage;

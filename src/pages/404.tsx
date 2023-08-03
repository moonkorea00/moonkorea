import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import SEO from '@components/common/SEO/SEO';
import NotFound from '@components/404/NotFound';

const metaData = {
  title: '404 페이지를 찾을 수 없습니다',
};

const NotFoundPage = () => {
  return (
    <>
      <SEO metaData={metaData} />
      <NotFound />
    </>
  );
};

export default NotFoundPage;

NotFoundPage.getLayout = DefaultLayout;
NotFoundPage.pagType = '404';

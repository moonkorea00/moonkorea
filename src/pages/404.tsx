import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import Metadata from '@components/common/Metadata/Metadata';
import NotFound from '@components/404/NotFound';

const metaData = {
  title: '404 페이지를 찾을 수 없습니다',
};

const NotFoundPage = () => {
  return (
    <>
      <Metadata metaData={metaData} />
      <NotFound />
    </>
  );
};

export default NotFoundPage;

NotFoundPage.getLayout = DefaultLayout;
NotFoundPage.pagType = '404';

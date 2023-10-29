import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import Metadata from '@components/common/Metadata/Metadata';
import ErrorWithRedirection from '@components/common/Error/ErrorWithRedirection';

const metaData = {
  title: '404 페이지를 찾을 수 없습니다',
};

const NotFoundPage = () => {
  return (
    <>
      <Metadata metaData={metaData} />
      <ErrorWithRedirection>
        <h1>페이지를 찾을 수 없습니다.</h1>
      </ErrorWithRedirection>
    </>
  );
};

export default NotFoundPage;

NotFoundPage.getLayout = DefaultLayout;
NotFoundPage.pageType = '404';

import Header from '@components/common/Header/Header';
import ErrorWithRedirection from '@components/common/Error/ErrorWithRedirection';

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <ErrorWithRedirection>
        <h2>페이지를 찾을 수 없습니다.</h2>
      </ErrorWithRedirection>
    </>
  );
};

export default NotFoundPage;

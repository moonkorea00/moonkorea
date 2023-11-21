import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getQueryParamAsPositiveNumber } from '@utils/router';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const onPreviousPageClick = () => {
    router.push(`/pages/${Math.max(1, currentPage - 1)}`);
  };

  const onNextPageClick = () => {
    router.push(`/pages/${currentPage + 1}`);
  };

  useEffect(
    () => setCurrentPage(getQueryParamAsPositiveNumber(router.query.page) ?? 1),
    [router.query.page]
  );

  return {
    currentPage,
    onPreviousPageClick,
    onNextPageClick,
  };
};

export default usePagination;

import * as S from './Pagination.style';
import PaginationItem from './PaginationItem/PaginationItem';

import usePagination from './hooks/usePagination';

interface PaginationProps {
  pages: number[];
}

const Pagination = ({ pages }: PaginationProps) => {
  const { currentPage, onPreviousPageClick, onNextPageClick } = usePagination();

  return (
    <S.Container>
      <S.PaginatePrevButton
        onClick={onPreviousPageClick}
        disabled={currentPage === 1}
      >
        이전
      </S.PaginatePrevButton>
      <S.PaginationList>
        {pages.map(page => (
          <PaginationItem
            key={page}
            page={page}
            isActive={currentPage === page}
          />
        ))}
      </S.PaginationList>
      <S.PaginateNextButton
        onClick={onNextPageClick}
        disabled={currentPage === pages.length}
      >
        다음
      </S.PaginateNextButton>
    </S.Container>
  );
};

export default Pagination;

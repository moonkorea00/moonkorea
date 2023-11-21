import * as S from './PaginationItem.style';

import Link from 'next/link';

interface IPaginationItem {
  page: number;
  isActive: boolean;
}

export default function PaginationItem({ page, isActive }: IPaginationItem) {
  return (
    <Link href={`/pages/${page}`}>
      <S.Page isActive={isActive}>{page}</S.Page>
    </Link>
  );
}

'use client';

import type { TableOfContents as ITableOfContents } from './types';

import * as S from './TableOfContents.style';
import TableOfContentsList from './TableOfContentsList/TableOfContentsList';

interface TableOfContentsProps {
  toc: ITableOfContents;
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  return (
    <S.Container>
      <TableOfContentsList {...toc} />
    </S.Container>
  );
};

export default TableOfContents;

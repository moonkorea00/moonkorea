import type { NestedHeading } from '@components/Markdown/types';

import * as S from './TablesOfContentsList.style';
import TableOfContentsItem from '../TableOfContentsItem/TableOfContentsItem';

interface TableOfContentsListProps {
  tocTree: NestedHeading[];
  headingSlugs: string[];
}

const TableOfContentsList = ({
  tocTree,
  headingSlugs,
}: TableOfContentsListProps) => {
  return (
    <S.Container>
      {tocTree.map((heading: NestedHeading) => (
        <TableOfContentsItem
          key={heading.value}
          heading={heading}
          headingSlugs={headingSlugs}
        />
      ))}
    </S.Container>
  );
};

export default TableOfContentsList;

import type { NestedHeading } from '@components/Markdown/types';

import * as S from './TablesOfContentsList.style';
import TableOfContentsItem from '../TableOfContentsItem/TableOfContentsItem';

interface TableOfContentsListProps {
  tocTree: NestedHeading[];
}

const TableOfContentsList = ({
  tocTree,
}: TableOfContentsListProps) => {
  return (
    <S.Container>
      {tocTree.map((heading: NestedHeading) => (
        <TableOfContentsItem
          key={heading.value}
          heading={heading}
        />
      ))}
    </S.Container>
  );
};

export default TableOfContentsList;

import type { NestedHeading } from '@components/Markdown/types';

import * as S from './TableOfContents.style';
import TableOfContentsList from './TableOfContentsList/TableOfContentsList';

interface TableOfContentsProps {
  tocTree: NestedHeading[];
}

const TableOfContents = ({ tocTree }: TableOfContentsProps) => {
  return (
    <S.Container>
      <TableOfContentsList tocTree={tocTree} />
    </S.Container>
  );
};

export default TableOfContents;

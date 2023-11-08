import type { NestedHeading } from '@components/Markdown/types';

import * as S from './TableOfContents.style';
import TableOfContentsList from './TableOfContentsList/TableOfContentsList';

interface TableOfContentsProps {
  tocTree: NestedHeading[];
  headingSlugs: string[];
}

const TableOfContents = ({ tocTree, headingSlugs }: TableOfContentsProps) => {
  return (
    <S.Container>
      <TableOfContentsList tocTree={tocTree} headingSlugs={headingSlugs} />
    </S.Container>
  );
};

export default TableOfContents;

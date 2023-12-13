import type { NestedHeading } from '@components/Markdown/types';

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
    <ul>
      {tocTree.map((heading: NestedHeading) => (
        <TableOfContentsItem
          key={heading.value}
          heading={heading}
          headingSlugs={headingSlugs}
        />
      ))}
    </ul>
  );
};

export default TableOfContentsList;

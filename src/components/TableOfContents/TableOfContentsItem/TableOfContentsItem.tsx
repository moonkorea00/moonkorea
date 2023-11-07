import type { NestedHeading } from '@components/Markdown/types';

import * as S from './TablesOfContentsItem.style';
import TableOfContentsList from '../TableOfContentsList/TableOfContentsList';

import useScrollToHashLink from '@hooks/useScrollToHashLink';

import { convertToSlug } from '@utils/markdown';
import Link from 'next/link';

interface TableOfContentsItemProps {
  heading: NestedHeading;
}

const TableOfContentsItem = ({ heading }: TableOfContentsItemProps) => {
  const slug = convertToSlug(heading.value);

  const onScrollToHashLink = useScrollToHashLink(slug);

  return (
    <li>
      <Link href={`#${slug}`} scroll={false} onClick={onScrollToHashLink}>
        <S.Heading>{heading.value}</S.Heading>
      </Link>
      {heading.children.length !== 0 && (
        <TableOfContentsList tocTree={heading?.children} />
      )}
    </li>
  );
};

export default TableOfContentsItem;

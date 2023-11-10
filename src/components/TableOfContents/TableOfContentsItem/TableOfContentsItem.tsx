import type { NestedHeading } from '@components/Markdown/types';

import * as S from './TablesOfContentsItem.style';
import TableOfContentsList from '../TableOfContentsList/TableOfContentsList';

import Link from 'next/link';

import useActiveHeadingObserver from '../hooks/useActiveHeadingObserver';
import useHashLink from '@hooks/useHashLink';

interface TableOfContentsItemProps {
  heading: NestedHeading;
  headingSlugs: string[];
}

const TableOfContentsItem = ({
  heading,
  headingSlugs,
}: TableOfContentsItemProps) => {
  const { slug, value } = heading;

  const activeId = useActiveHeadingObserver(headingSlugs);
  const isHeadingActive = slug === activeId;

  const { hashLink, onScrollWithOffset } = useHashLink(slug);

  return (
    <li>
      <Link href={hashLink} scroll={false} onClick={onScrollWithOffset}>
        <S.Heading isHeadingActive={isHeadingActive}>{value}</S.Heading>
      </Link>
      {heading.children.length !== 0 && (
        <TableOfContentsList
          tocTree={heading?.children}
          headingSlugs={headingSlugs}
        />
      )}
    </li>
  );
};

export default TableOfContentsItem;

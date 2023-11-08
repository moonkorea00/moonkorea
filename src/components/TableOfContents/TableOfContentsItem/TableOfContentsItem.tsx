import type { NestedHeading } from '@components/Markdown/types';

import * as S from './TablesOfContentsItem.style';
import TableOfContentsList from '../TableOfContentsList/TableOfContentsList';

import useScrollToHashLink from '@hooks/useScrollToHashLink';

import { convertToSlug } from '@utils/markdown';
import Link from 'next/link';
import useActiveHeadingObserver from '../hooks/useActiveHeadingObserver';

interface TableOfContentsItemProps {
  heading: NestedHeading;
  headingSlugs: string[];
}

const TableOfContentsItem = ({
  heading,
  headingSlugs,
}: TableOfContentsItemProps) => {
  const slug = convertToSlug(heading.value);
  const activeId = useActiveHeadingObserver(headingSlugs);
  const isHeadingActive = slug === activeId;

  const hashLink = `#${slug}`;

  const onScrollToHashLink = useScrollToHashLink(slug);

  return (
    <li>
      <Link href={hashLink} scroll={false} onClick={onScrollToHashLink}>
        <S.Heading isHeadingActive={isHeadingActive}>{heading.value}</S.Heading>
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

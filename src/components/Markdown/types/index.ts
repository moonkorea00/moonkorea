import type { ReactNode } from 'react';

export type HeadingWithLinkProps = PropsWithStrictChildren<
  { level: number },
  ReactNode[]
>;

export type NestedHeading = HeadingWithLinkProps & {
  value: string;
  slug: string;
  children: NestedHeading[];
};

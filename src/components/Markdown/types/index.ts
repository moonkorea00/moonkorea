import type { ReactNode } from 'react';

export type HeadingWithLinkProps = PropsWithStrictChildren<
  { level: number },
  ReactNode[]
>;

export type NestedHeading = HeadingWithLinkProps & {
  value: string;
  children: NestedHeading[];
};

export interface MarkdownImageProps {
  src: string;
  alt: string;
  width: number;
  height?: number;
}

export interface MarkdownVideoProps {
  url: string;
}

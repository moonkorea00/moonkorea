import type { ReactNode } from 'react';

export type HeadingWithLinkProps = PropsWithStrictChildren<
  { level: number },
  ReactNode[]
>;

export interface MarkdownImageProps {
  src: string;
  alt: string;
  width: number;
  height?: number;
}

export interface MarkdownVideoProps {
  url: string;
}

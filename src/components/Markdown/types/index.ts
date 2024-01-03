import type { HTMLAttributes, ReactNode } from 'react';
import type { ImageProps } from 'next/image';
import type { ImageSizes } from '@api/image';

export type HeadingWithLinkProps = PropsWithStrictChildren<
  { level: number },
  ReactNode[]
>;

export type NestedHeading = HeadingWithLinkProps & {
  value: string;
  slug: string;
  children: NestedHeading[];
};

export interface MarkdownImageProps extends ImageProps {
  imageSizes: ImageSizes;
}

export type CustomMarkdownComponents = {
  h1: (props: HeadingWithLinkProps) => JSX.Element;
  h2: (props: HeadingWithLinkProps) => JSX.Element;
  h3: (props: HeadingWithLinkProps) => JSX.Element;
  span: (props: HTMLAttributes<HTMLSpanElement>) => JSX.Element;
  p: (props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element;
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => JSX.Element;
  img: ({ ...props }) => JSX.Element;
  code: ({ children }: { children: ReactNode[] }) => JSX.Element;
  video: ({ ...props }) => JSX.Element;
  iframe: (props: HTMLAttributes<HTMLIFrameElement>) => JSX.Element;
};

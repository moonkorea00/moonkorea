'use client';

import type { CustomMarkdownComponents } from './types';

import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ImageProps } from '@api/image';

import * as MDX from './CustomMarkdown/mdx';

interface MarkdownProps {
  content: string;
  imageProps: ImageProps;
}

const Markdown = ({ content, imageProps }: MarkdownProps) => {
  const markdownComponents: CustomMarkdownComponents = {
    h1: MDX.HeadingWithLink,
    h2: MDX.HeadingWithLink,
    h3: MDX.HeadingWithLink,
    span: MDX.MarkdownSpan,
    p: MDX.MarkdownP,
    blockquote: MDX.MarkdownBlockquote,
    img: props => (
      <MDX.MarkdownImage
        {...props}
        imageProps={imageProps}
        src={props.src}
        alt={props.alt}
      />
    ),
    code: MDX.MarkdownCode,
    video: MDX.MarkdownVideo,
    iframe: MDX.MarkdownIframe,
  };
  return (
    <Reactmarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
      {content}
    </Reactmarkdown>
  );
};

export default Markdown;

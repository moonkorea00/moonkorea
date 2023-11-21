import type {
  DetailedHTMLFactory,
  HTMLAttributes,
  ImgHTMLAttributes,
  VideoHTMLAttributes,
} from 'react';

import * as MDX from './CustomMarkdown/mdx';

import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
}

const markdownComponents = {
  h1: MDX.HeadingWithLink,
  h2: MDX.HeadingWithLink,
  h3: MDX.HeadingWithLink,
  span: MDX.MarkdownSpan,
  p: MDX.MarkdownP,
  blockquote: MDX.MarkdownBlockquote,
  img: MDX.MarkdownImage as DetailedHTMLFactory<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  code: MDX.MarkdownCode as DetailedHTMLFactory<
    HTMLAttributes<HTMLElement>,
    HTMLElement
  >,
  video: MDX.MarkdownVideo as DetailedHTMLFactory<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
  iframe: ({ ...props }) => <MDX.MarkdownIframe {...props} />,
};

const Markdown = ({ content }: MarkdownProps) => {
  return (
    <Reactmarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
      {content}
    </Reactmarkdown>
  );
};

export default Markdown;

/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  DetailedHTMLFactory,
  HTMLAttributes,
  VideoHTMLAttributes,
} from 'react';
import type { ImageSizes } from '@api/post/post.utils';

import * as MDX from './CustomMarkdown/mdx';

import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
  imageSizes: ImageSizes;
}

const Markdown = ({ content, imageSizes }: MarkdownProps) => {
  const markdownComponents = {
    h1: MDX.HeadingWithLink,
    h2: MDX.HeadingWithLink,
    h3: MDX.HeadingWithLink,
    span: MDX.MarkdownSpan,
    p: MDX.MarkdownP,
    blockquote: MDX.MarkdownBlockquote,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    img: ({...props}) => <MDX.MarkdownImage {...props} imageSizes={imageSizes} />,
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
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Reactmarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
      {content}
    </Reactmarkdown>
  );
};

export default Markdown;

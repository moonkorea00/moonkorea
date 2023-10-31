import type {
  DetailedHTMLFactory,
  ImgHTMLAttributes,
  HTMLAttributes,
} from 'react';
import * as MD from './CustomMarkdown/md'
import * as MDX from './CustomMarkdown/mdx';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
}

const Markdown = ({ content }: MarkdownProps) => {
  return (
    <Reactmarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ ...props }) => <MD.MarkdownH1 {...props} />,
        h2: ({ ...props }) => <MD.MarkdownH2 {...props} />,
        h3: ({ ...props }) => <MD.MarkdownH3 {...props} />,
        span: ({ ...props }) => <MD.MarkdownSpan {...props} />,
        p: ({ ...props }) => <MD.MarkdownP {...props} />,
        blockquote: ({ ...props }) => <MD.MarkdownBlockquote {...props} />,
        img: MDX.MarkdownImage as DetailedHTMLFactory<
          ImgHTMLAttributes<HTMLImageElement>,
          HTMLImageElement
        >,
        code: MDX.MarkdownCode as DetailedHTMLFactory<
          HTMLAttributes<HTMLElement>,
          HTMLElement
        >,
        video: MDX.MarkdownVideo as DetailedHTMLFactory<
          React.VideoHTMLAttributes<HTMLVideoElement>,
          HTMLVideoElement
        >,
        iframe: ({ ...props }) => <MDX.MarkdownIframe {...props} />,
      }}
    >
      {content}
    </Reactmarkdown>
  );
};

export default Markdown;

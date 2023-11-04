import * as MD from './md';

import type {
  MarkdownImageProps,
  MarkdownVideoProps,
  HeadingWithLinkProps,
} from '../types';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
// load client side. see https://github.com/cookpete/react-player/issues/1474

export const MDIframe = dynamic(
  () =>
    import('@components/Markdown/CustomMarkdown/mdx').then(
      module => module.MarkdownIframe
    ),
  { ssr: false }
);

export const MarkdownCode = ({
  children,
}: // eslint-disable-next-line @typescript-eslint/ban-types
PropsWithStrictChildren<{}, string[]>) => {
  const customStyle = {
    padding: '10px 15px',
    margin: '22px 0',
    borderRadius: '6px',
    lineHeight: '22px',
    backgroundColor: '#f8f8f8',
  };
  return (
    <SyntaxHighlighter
      language="javascript"
      style={githubGist}
      customStyle={customStyle}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export const MarkdownImage = ({
  src,
  alt,
  width,
  height,
}: MarkdownImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ display: 'block', margin: '0 auto 2vh auto' }}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      layout="intrinsic"
    />
  );
};

export const MarkdownVideo = ({ url, ...props }: MarkdownVideoProps) => {
  return (
    <ReactPlayer url={url} playing={true} loop={true} muted={true} {...props} />
  );
};

export const MarkdownIframe = ({ ...props }) => {
  return <iframe {...props}></iframe>;
};

export const MarkdownH1 = ({ ...props }) => {
  return <MD.StyledH1 {...props} />;
};

export const MarkdownH2 = ({ ...props }) => {
  return <MD.StyledH2 {...props} />;
};

export const MarkdownH3 = ({ ...props }) => {
  return <MD.StyledH3 {...props} />;
};

export const MarkdownBlockquote = ({ ...props }) => {
  return <MD.StyledBlockQuote {...props} />;
};

export const MarkdownP = ({ ...props }) => {
  return <MD.StyledP {...props} />;
};

export const MarkdownSpan = ({ ...props }) => {
  return <MD.StyledSpan {...props} />;
};

export const HeadingWithLink = ({ level, children }: HeadingWithLinkProps) => {
  const link = decodeURI(String(children[0]))
    .toLowerCase()
    .trim()
    .replaceAll(' ', '-');

  const scrollToHeading = () => {
    setTimeout(() => {
      window.scrollBy(0, -60);
    }, 0);
  };

  const renderHeading = () => {
    switch (level) {
      case 1:
        return <MarkdownH1>{children[0]}</MarkdownH1>;
      case 2:
        return <MarkdownH2>{children[0]}</MarkdownH2>;
      case 3:
        return <MarkdownH3>{children[0]}</MarkdownH3>;
      default:
        throw new Error('No valid level for heading');
    }
  };

  return (
    <a id={link} href={`#${link}`} onClick={scrollToHeading}>
      {renderHeading()}
    </a>
  );
};

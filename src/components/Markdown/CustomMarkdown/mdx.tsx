import * as S from './CustomMarkdown.style';
import type { ImageProps } from 'next/image';
import type { BaseReactPlayerProps } from 'react-player/base';
import type { HeadingWithLinkProps } from '../types';

import { HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import useScrollToHashLink from '@hooks/useScrollToHashLink';

import { convertToSlug } from '@utils/markdown';

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

export const MarkdownImage = (props: ImageProps) => {
  return (
    <Image
      style={{ display: 'block', margin: '0 auto 2vh auto' }}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      layout="intrinsic"
      {...props}
    />
  );
};

export const MarkdownVideo = (props: BaseReactPlayerProps) => {
  return (
    <ReactPlayer
      url={props.url}
      playing={true}
      loop={true}
      muted={true}
      {...props}
    />
  );
};

export const MarkdownIframe = (props: HTMLAttributes<HTMLIFrameElement>) => {
  return <iframe {...props}></iframe>;
};

export const MarkdownH1 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <S.H1 {...props} />;
};

export const MarkdownH2 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <S.H2 {...props} />;
};

export const MarkdownH3 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <S.H3 {...props} />;
};

export const MarkdownBlockquote = (props: HTMLAttributes<HTMLQuoteElement>) => {
  return <S.BlockQuote {...props} />;
};

export const MarkdownP = (props: HTMLAttributes<HTMLParagraphElement>) => {
  return <S.P {...props} />;
};

export const MarkdownSpan = (props: HTMLAttributes<HTMLSpanElement>) => {
  return <S.Span {...props} />;
};

export const HeadingWithLink = ({ level, children }: HeadingWithLinkProps) => {
  const slug = convertToSlug(String(children[0]));
  const hashLink = `#${slug}`;

  const onScrollToHashLink = useScrollToHashLink(slug);

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
    <Link id={slug} href={hashLink} scroll={false} onClick={onScrollToHashLink}>
      {renderHeading()}
    </Link>
  );
};

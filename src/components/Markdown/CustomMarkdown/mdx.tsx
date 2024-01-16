import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseReactPlayerProps } from 'react-player/base';
import type { MarkdownImageProps, HeadingWithLinkProps } from '../types';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import * as S from './CustomMarkdown.style';

import useHashLink from '@hooks/useHashLink';
import useCopyToClipboard from '@hooks/useCopyToClipboard';

import { convertToSlug } from '@utils/markdown';
import { assets } from '@utils/assetsPath';

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
PropsWithStrictChildren<{}, ReactNode[]>) => {
  const code = children.join();
  const title = code.substring(0, code.indexOf('\n'));
  const content = code.substring(
    code.indexOf('\n') + 1,
    code.lastIndexOf('\n')
  );

  const { isCopied, onCopy } = useCopyToClipboard();

  const customStyle = {
    padding: '10px 15px',
    lineHeight: '21px',
    fontSize: '12px',
  };

  return (
    <S.HighlighterContainer>
      <S.Header>
        <S.HighlighterTitle>{title}</S.HighlighterTitle>
        <S.CopyButton disabled={isCopied} onClick={() => onCopy(content)}>
          <S.ClipboardStatusImage
            src={isCopied ? assets.check : assets.copy}
            alt="클립보드"
          />
        </S.CopyButton>
      </S.Header>
      <SyntaxHighlighter
        language="javascript"
        style={githubGist}
        customStyle={customStyle}
        showLineNumbers
      >
        {content}
      </SyntaxHighlighter>
    </S.HighlighterContainer>
  );
};

export const MarkdownImage = ({
  src,
  alt,
  imageProps,
  ...rest
}: MarkdownImageProps) => {
  const imgSource = decodeURI(src as string);
  return (
    <Image
      {...rest}
      {...imageProps[imgSource]}
      src={src}
      alt={alt}
      quality={100}
      placeholder="blur"
      sizes="(max-width: 699px) 100vw, 700px"
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

export const MarkdownVideo = (props: BaseReactPlayerProps) => {
  return (
    <ReactPlayer
      {...props}
      url={props.url}
      playing={true}
      loop={true}
      muted={true}
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

type HeadingLevel = keyof typeof headingMap;

const headingMap = {
  1: MarkdownH1,
  2: MarkdownH2,
  3: MarkdownH3,
};

export const HeadingWithLink = ({ level, children }: HeadingWithLinkProps) => {
  const content = children.join();
  const slug = convertToSlug(content);

  const { hashLink, onScrollWithOffset } = useHashLink(slug);

  const MarkdownHeading = headingMap[level as HeadingLevel];

  return (
    <Link id={slug} href={hashLink} scroll={false} onClick={onScrollWithOffset}>
      <MarkdownHeading>{content}</MarkdownHeading>
    </Link>
  );
};

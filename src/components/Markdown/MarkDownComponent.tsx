import Image from 'next/image';
import dynamic from 'next/dynamic';
import SyntaxHighlighter from 'react-syntax-highlighter';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
// load client side. see https://github.com/cookpete/react-player/issues/1474

export const MDIframe = dynamic(
  () =>
    import('src/components/Markdown/MarkDownComponent').then(
      module => module.MarkdownIframe
    ),
  { ssr: false }
);

interface MarkdownCodeProps {
  children: string[];
}

interface MarkdownImageProps {
  src: string;
  alt: string;
  width: number;
  height?: number;
}

interface MarkdownVideoProps {
  url: string;
}

export const MarkdownCode = ({ children }: MarkdownCodeProps) => {
  const customStyle = {
    padding: '10px 15px',
    margin: '22px 0',
    borderRadius: '10px',
    lineHeight: '24px'
  };
  return (
    <SyntaxHighlighter language="javascript" customStyle={customStyle}>
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

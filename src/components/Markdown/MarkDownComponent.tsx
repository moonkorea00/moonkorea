import SyntaxHighlighter from 'react-syntax-highlighter';
import Image from 'next/image';

interface MarkdownCodeProps {
  children: string[];
}

interface MarkdownImageProps {
  src: string;
  alt: string;
  width: number;
  height?: number;
}

export const MarkdownCode = ({ children }: MarkdownCodeProps) => {
  const customStyle = {
    padding: '10px 15px',
    margin: '22px 0',
    borderRadius: '10px',
  };
  return (
    <SyntaxHighlighter language="javascript" customStyle={customStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

export const MarkDownImage = ({
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

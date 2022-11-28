import SyntaxHighlighter from 'react-syntax-highlighter';

interface MarkdownCodeProps {
  children: string[];
}

const MarkdownCode = ({ children }: MarkdownCodeProps) => {
  const customStyle = {
    padding: '10px 15px',
    margin: '22px 0',
    // lineHeight: "1px",
    borderRadius: '10px',
  };
  return (
    <SyntaxHighlighter language="javascript" customStyle={customStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

export default MarkdownCode;

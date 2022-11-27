import SyntaxHighlighter from 'react-syntax-highlighter';

const MarkdownCode = ({ children }) => {
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

export default MarkdownCode;

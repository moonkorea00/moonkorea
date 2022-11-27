import * as MD from './Markdown/MardownCustomComponents';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Layout from './Layout';
import MetaData from './MetaData';
import usePost from '../hooks/usePost';

const Blog = () => {
  const post = usePost();

  return (
    <Layout>
      <MetaData post={post} />
      <Reactmarkdown
        children={post?.content}
        skipHtml={false}
        rehypePlugins={[rehypeRaw]}
        parserOptions={{ commonmark: true }}
        components={{
          code: MarkdownCode,
          blockquote: ({ node, ...props }) => (
            <MD.MarkdownBlockquote {...props} />
          ),
          span: ({ node, ...props }) => (
            <em>
              <MD.MarkdownSpan {...props} />
            </em>
          ),
          img: ({ node, ...props }) => <MD.MarkdownImage {...props} />,
          h1: ({ node, ...props }) => <MD.MarkdownTitle {...props} />,
          h2: ({ node, ...props }) => <MD.MarkdownSubTitle {...props} />,
          h3: ({ node, ...props }) => <MD.MarkdownHeader {...props} />,
        }}
      />
    </Layout>
  );
};

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

export default Blog;

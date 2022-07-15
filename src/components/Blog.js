import { useParams } from 'react-router';
import * as MarkdownComponents from './MarkdownCustomComponents/MardownCustomComponents';
import Layout from './Layout';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import postList from '../posts.json';
import { useTitle } from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Blog = () => {
  const [post, setPost] = useState({});
  const { category, path } = useParams();
  const navigate = useNavigate();
  const {
    MarkdownBlockquote,
    MarkdownSpan,
    MarkdownImage,
    MarkdownTitle,
    MarkdownHeader,
  } = MarkdownComponents;
  useTitle(`${path.replaceAll('-', ' ')} (${category})`);

  useEffect(() => {
    setPost(
      postList.find(post => post.category === category && post.path === path)
    );
    if (!post) {
      navigate('/page-not-found', { replace: true });
    }
  }, [category, post, path, navigate]);

  return (
    <Layout>
      <Reactmarkdown
        children={post?.content}
        skipHtml={false}
        rehypePlugins={[rehypeRaw]}
        parserOptions={{ commonmark: true }}
        components={{
          code: Component,
          blockquote: ({ node, ...props }) => <MarkdownBlockquote {...props} />,
          span: ({ node, ...props }) => (
            <em>
              <MarkdownSpan {...props} />
            </em>
          ),
          img: ({ node, ...props }) => <MarkdownImage alt="" {...props} />,
          h1: ({ node, ...props }) => <MarkdownTitle {...props} />,
          h3: ({ node, ...props }) => <MarkdownHeader {...props} />,
        }}
      />
    </Layout>
  );
};

const Component = ({ children }) => {
  // console.log(`MARKDOWN`, children);
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

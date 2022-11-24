import { useParams } from 'react-router';
import * as MD from './MarkdownCustomComponents/MardownCustomComponents';
import Layout from './Layout';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import postList from '../posts.json';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import MetaData from './MetaData';

const Blog = () => {
  const [post, setPost] = useState({});
  const { category, path } = useParams();
  const navigate = useNavigate();

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
      <MetaData post={post} />
      <Reactmarkdown
        children={post?.content}
        skipHtml={false}
        rehypePlugins={[rehypeRaw]}
        parserOptions={{ commonmark: true }}
        components={{
          code: Component,
          blockquote: ({ node, ...props }) => <MD.MarkdownBlockquote {...props} />,
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

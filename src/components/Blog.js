import { useParams } from 'react-router';
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
  useTitle(`${path.replaceAll('-', ' ')} (${category})`);

  useEffect(() => {
    setPost(
      postList.find(post => post.category === category && post.path === path)
    );
    if (!post) {
      navigate('/moonkorea/page-not-found', { replace: true });
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
          blockquote: ({ node, ...props }) => (
            <blockquote
              style={{
                margin: '0',
                marginBottom: '0.85em',
                padding: '0 15px',
                color: '#858585',
                borderLeft: '4px solid #e5e5e5',
              }}
              {...props}
            />
          ),
        }}
      />
    </Layout>
  );
};

const Component = ({ children }) => {
  // console.log(`MARKDOWN`, children);
  const customStyle = {
    padding: '10px 15px',
    borderRadius: '10px',
  };
  return (
    <SyntaxHighlighter language="javascript" customStyle={customStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Blog;

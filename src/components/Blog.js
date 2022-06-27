import { useParams } from 'react-router';
import Layout from './Layout';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import postList from '../posts.json';
import { useTitle } from '../hooks/useTitle';

const Blog = () => {
  const { category, path } = useParams();
  useTitle(`${path.replaceAll('-', ' ')} (${category})`);

  const currentPost = {};
  postList.forEach(post => {
    if (post.path === path) {
      currentPost.content = post.content;
    }
  });

  console.log(currentPost);
  return (
    <Layout>
      <Reactmarkdown
        children={currentPost.content}
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
  console.log(`MARKDOWN`, children);
  const customStyle = {
    padding: '15px',
    borderRadius: '20px',
  };
  return (
    <SyntaxHighlighter language="javascript" customStyle={customStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Blog;

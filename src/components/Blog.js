import { useParams } from 'react-router';
import Layout from './Layout';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import postList from '../posts.json';
import { useTitle } from '../hooks/useTitle';
const Blog = () => {
  const { id } = useParams();
  const { category, title } = postList[id - 1];
  useTitle(`${category} - ${title}`);

  return (
    <Layout>
      <Reactmarkdown
        children={postList[id - 1].content}
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

const BlogMain = styled.main`
  /* width: 70vw; */
  /* display: inline-block; */
  /* width: 100%; */
  width: 65%;
  height: 85vh;
  padding: 5vh 5vw 0 5vw;
  /* border: 1px solid red; */
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior-y: none;
  /* ::-webkit-scrollbar {
    display: none;
} */
`;
export default Blog;

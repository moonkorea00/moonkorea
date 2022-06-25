import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useState } from 'react';
// import test from '../articles/test.md';
// import blog from '../articles/blog.md';
import Reactmarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import rehypeRaw from 'rehype-raw';
import postList from '../posts.json';

const Blog = () => {
  const { article } = useSelector(state => ({
    article: state.article.article,
  }));
  const dispatch = useDispatch();
  const [markdown, setMarkdown] = useState(null);

  const string = `# 변수 \n변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 말한다. \n> ### **변수의 선언이란?** `;

  return (
    <BlogMain>
      
      <div>test</div>
      <Reactmarkdown
        children={postList[1]?.content}
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
    </BlogMain>
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

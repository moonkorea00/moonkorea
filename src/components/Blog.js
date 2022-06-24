import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useEffect, useState } from 'react';
import test from '../articles/test.md';
import Reactmarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

const Blog = () => {
  const { article } = useSelector(state => ({
    article: state.article.article,
  }));
  console.log(`article`, article);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(test)
      .then(res => res.text())
      .then(res => setMarkdown(res));
  }, []);
  return (
    <BlogMain>
      <Reactmarkdown
        children={markdown}
        skipHtml={false}
        components={{ code: Component }}
      />
    </BlogMain>
  );
};

const Component = ({ children }) => {
  console.log(`MARKDOWN`, children);
  const customStyle = {
    padding: '20px',
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
  width: 100%;
  height: 85vh;
  padding: 5vh 5vw 0 5vw;
  /* border: 1px solid red; */
  overflow-y: scroll;
  overscroll-behavior-y: none;
`;
export default Blog;

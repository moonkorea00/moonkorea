import * as MD from '../Markdown/CustomMarkdown.style';
import MarkdownCode from '../Markdown/MarkdownCode';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import MetaData from '../common/SEO/MetaData';
import usePost from './hooks/usePost';

const Post = () => {
  const post = usePost();
  return (
    <>
      <MetaData post={post} />
      <Reactmarkdown
        rehypePlugins={[rehypeRaw]}
        parserOptions={{ commonmark: true }}
        components={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          code: MarkdownCode,
          blockquote: ({ node, ...props }) => (
            <MD.MarkdownBlockquote {...props} />
          ),
          span: ({ node, ...props }) => <MD.MarkdownSpan {...props} />,
          img: ({ node, ...props }) => <MD.MarkdownImage {...props} />,
          h1: ({ node, ...props }) => <MD.MarkdownTitle {...props} />,
          h2: ({ node, ...props }) => <MD.MarkdownHeader {...props} />,
          h3: ({ node, ...props }) => <MD.MarkdownSubHeader {...props} />,
        }}
      >
        {post?.content}
      </Reactmarkdown>
    </>
  );
};

export default Post;

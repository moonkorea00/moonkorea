import * as MD from '@components/Markdown/CustomMarkdown.style';
import * as MDX from '@components/Markdown/MarkDownComponent';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getPostPaths, getPostById } from '@utils/api';

interface Props {
  params: {
    postId: string;
  };
}

const Post = ({ content }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Reactmarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        // TODO
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        code: MDX.MarkdownCode,
        blockquote: ({ node, ...props }) => (
          <MD.MarkdownBlockquote {...props} />
        ),
        span: ({ node, ...props }) => <MD.MarkdownSpan {...props} />,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        img: MDX.MarkDownImage,
        h1: ({ node, ...props }) => <MD.MarkdownH1 {...props} />,
        h2: ({ node, ...props }) => <MD.MarkdownH2 {...props} />,
        h3: ({ node, ...props }) => <MD.MarkdownH3 {...props} />,
      }}
    >
      {content}
    </Reactmarkdown>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = getPostPaths();
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Props) => {
  const { content } = await getPostById(params.postId);
  return {
    props: { content },
  };
};

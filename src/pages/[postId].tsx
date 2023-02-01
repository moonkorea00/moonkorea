import * as MD from '@components/Markdown/CustomMarkdown.style';
import * as MDX from '@components/Markdown/MarkDownComponent';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import ArticleLayout from '@components/common/ArticleLayout/ArticleLayout';
import { getPostPaths, getPostById } from '@lib/post/getPost';
import SEO from '@components/common/SEO/SEO';

interface Props {
  params: {
    postId: string;
  };
}

const Post = ({ metaData }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <ArticleLayout pageType="post">
      <SEO metaData={metaData} />
      <Reactmarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ ...props }) => <MD.MarkdownH1 {...props} />,
          h2: ({ ...props }) => <MD.MarkdownH2 {...props} />,
          h3: ({ ...props }) => <MD.MarkdownH3 {...props} />,
          span: ({ ...props }) => <MD.MarkdownSpan {...props} />,
          blockquote: ({ ...props }) => <MD.MarkdownBlockquote {...props} />,
          // TODO
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          img: MDX.MarkDownImage,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          code: MDX.MarkdownCode,
        }}
      >
        {metaData.content}
      </Reactmarkdown>
    </ArticleLayout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = getPostPaths();
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Props) => {
  const metaData = await getPostById(params.postId);
  return {
    props: { metaData },
  };
};

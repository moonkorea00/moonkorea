import * as MD from '@components/Markdown/CustomMarkdown.style';
import * as MDX from '@components/Markdown/MarkDownComponent';
import {
  useRef,
  DetailedHTMLFactory,
  ImgHTMLAttributes,
  HTMLAttributes,
} from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Reactmarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Layout from '@components/common/Layout/Layout';
import SEO from '@components/common/SEO/SEO';
import CommentSection from '@components/Comments/CommentSection';
import { getPostPaths, getPostById } from '@lib/post/getPost';
import useIsIntersected from '@hooks/useIsIntersected';

interface Props {
  params: {
    postId: string;
  };
}

const Post = ({ metaData }: InferGetStaticPropsType<GetStaticProps>) => {
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const isIntersected = useIsIntersected(commentSectionRef, {
    once: true,
  });

  return (
    <Layout metaData={metaData} pageType="post">
      <SEO metaData={metaData} />
      <Reactmarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ ...props }) => <MD.MarkdownH1 {...props} />,
          h2: ({ ...props }) => <MD.MarkdownH2 {...props} />,
          h3: ({ ...props }) => <MD.MarkdownH3 {...props} />,
          span: ({ ...props }) => <MD.MarkdownSpan {...props} />,
          p: ({ ...props }) => <MD.MarkdownP {...props} />,
          blockquote: ({ ...props }) => <MD.MarkdownBlockquote {...props} />,
          img: MDX.MarkdownImage as DetailedHTMLFactory<
            ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
          >,
          code: MDX.MarkdownCode as DetailedHTMLFactory<
            HTMLAttributes<HTMLElement>,
            HTMLElement
          >,
          video: MDX.MarkdownVideo as DetailedHTMLFactory<
            React.VideoHTMLAttributes<HTMLVideoElement>,
            HTMLVideoElement
          >,
          iframe: ({ ...props }) => <MDX.MarkdownIframe {...props} />,
        }}
      >
        {metaData.content}
      </Reactmarkdown>
      <div ref={commentSectionRef} />
      {isIntersected && <CommentSection />}
    </Layout>
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

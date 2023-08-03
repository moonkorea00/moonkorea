import type { MetaData } from '@@types/metaData';
import Head from 'next/head';

interface SEOProps {
  metaData?: Partial<Pick<MetaData, 'id' | 'excerpt' | 'title'>>;
}

const SEO = ({ metaData }: SEOProps) => {
  const TITLE = 'moonkorea 개발 블로그';
  const DESCRIPTION = 'moonkorea 개발 블로그입니다.';

  return (
    <Head>
      <title>{metaData?.title || TITLE}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={metaData?.excerpt || DESCRIPTION} />
      <meta
        property="og:url"
        content={
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${metaData?.id}` ||
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}`
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:title" content={metaData?.title || TITLE} />
      <meta
        property="og:description"
        content={metaData?.excerpt || DESCRIPTION}
      />
      <meta property="og:image" content={process.env.NEXT_PUBLIC_IMG_URL} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaData?.title || TITLE} />
      <meta
        property="twitter:url"
        content={
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${metaData?.id}` ||
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}`
        }
      />
      <meta
        name="twitter:description"
        content={metaData?.excerpt || DESCRIPTION}
      />
      <meta name="twitter:image" content={process.env.NEXT_PUBLIC_IMG_URL} />
    </Head>
  );
};

export default SEO;

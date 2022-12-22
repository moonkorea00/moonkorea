import Head from 'next/head';

interface SEOProps {
  metaData: {
    id?: string;
    title?: string;
    excerpt?: string;
  };
}

const SEO = ({ metaData }: SEOProps) => {
  const TITLE = 'moonkorea 개발 블로그';
  const DESCRIPTION = 'moonkorea 개발 블로그입니다.';
  const DOMAIN = 'https://www.moonkorea.dev/';
  const IMG_URL = 'https://www.moonkorea.dev/assets/favicon/moonkorea.png';

  return (
    <>
      <Head>
        <title>{metaData.title || TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaData.excerpt || DESCRIPTION} />

        <meta
          property="og:url"
          content={`${DOMAIN}/${metaData.id}` || `${DOMAIN}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={TITLE} />
        <meta property="og:title" content={metaData.title || TITLE} />
        <meta
          property="og:description"
          content={metaData.excerpt || DESCRIPTION}
        />
        <meta property="og:image" content={IMG_URL} />
      </Head>
    </>
  );
};

export default SEO;

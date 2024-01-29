import { MetadataRoute } from 'next';

import { getAllPosts } from '@api/post';

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = getAllPosts();
  return [
    {
      url: 'https://moonkorea.dev/',
      lastModified: new Date(),
    },
    ...posts.map(({ id }) => ({
      url: `https://moonkorea.dev/${id}`,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;

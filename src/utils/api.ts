import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// eslint-disable-next-line no-undef
const postsDir = join(process.cwd(), '/src/_posts');
const fileNames = fs.readdirSync(postsDir);

export const getPostPaths = () => {
  return fileNames.map(fileName => {
    const path = fileName.replace(/\.mdx$/, '');
    return {
      params: {
        postId: path,
      },
    };
  });
};

export const getAllPosts = () => {
  const postsData = fileNames.map(fileName => {
    const filePath = join(postsDir, fileName);
    const metaData = fs.readFileSync(filePath, 'utf8');

    const id = fileName.replace(/\.mdx$/, '');
    const { data } = matter(metaData);
    return {
      id,
      ...data,
    };
  });

  return postsData;
};

export const getPostById = async (id: string) => {
  const filePath = join(postsDir, `${id}.mdx`);
  const metaData = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(metaData);

  const mdxSource = await serialize(content);

  return {
    id,
    mdxSource,
    ...data,
  };
};

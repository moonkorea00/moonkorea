import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDir = join(process.cwd(), '/src/_posts');
const fileNames = fs.readdirSync(postsDir);

export const getPostPaths = () => {
  return fileNames.map(fileName => {
    const path = fileName.replace(/\.md$/, '');
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

    const id = fileName.replace(/\.md$/, '');
    const { data } = matter(metaData);

    return {
      id,
      ...data,
    };
  });

  return postsData;
};

export const getPostById = async (id: string) => {
  const filePath = join(postsDir, `${id}.md`);
  const metaData = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(metaData);

  return {
    id,
    ...data,
    content,
  };
};

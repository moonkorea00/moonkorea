import type { FrontMatter } from '@@types/metaData';
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
  const postFrontMatter = fileNames.map(fileName => {
    const filePath = join(postsDir, fileName);
    const metaData = fs.readFileSync(filePath, 'utf8');

    const id = fileName.replace(/\.md$/, '');
    const { data } = matter(metaData);
    const { title, date, tags, description } = data;

    return {
      id,
      title,
      date,
      tags,
      description,
    };
  });

  return postFrontMatter;
};

export const getAllPostsSortedByDate = () => {
  const posts = getAllPosts();

  return posts.sort((a: FrontMatter, b: FrontMatter) =>
    a.date > b.date ? -1 : 1
  );
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

import type { HomePost, PagePost } from '@@types/post';

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import { extractIntrinsicImageSize } from '@api/image';
import { extractHeadings, nestHeadingWithChildren } from './post.utils';
import { convertToSlug } from '@utils/markdown';

const postsDir = join(process.cwd(), '/src/_posts');
const postFileNames = fs.readdirSync(postsDir);

export const getPostPaths = () => {
  const paths = postFileNames.map(fileName => {
    const path = fileName.replace(/\.md$/, '');
    return { postId: path };
  });

  return paths;
};

export const getAllPosts = () => {
  const postFrontMatter: HomePost[] = postFileNames.map(fileName => {
    const filePath = join(postsDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const id = fileName.replace(/\.md$/, '');
    const { data } = matter(fileContent);
    const { title, date, tags, excerpt } = data;

    return { id, title, date, tags, excerpt };
  });

  return postFrontMatter;
};

export const getAllPostsSortedByDate = () => {
  const posts = getAllPosts();
  return posts.sort((a: HomePost, b: HomePost) => (a.date > b.date ? -1 : 1));
};

export const getPostById = async (
  id: string
): Promise<PagePost | undefined> => {
  const isExistingPost = postFileNames.some(
    fileName => fileName === `${decodeURI(id)}.md`
  );

  if (!isExistingPost) return undefined;

  const filePath = join(postsDir, `${decodeURI(id)}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const { title, date, description, excerpt } = data;

  const imageProps = await extractIntrinsicImageSize(content);

  const headings = extractHeadings(content);
  const tocTree = nestHeadingWithChildren(headings);
  const headingSlugs = headings.map(heading => convertToSlug(heading.value));

  const toc = { tocTree, headingSlugs };

  return { title, date, description, excerpt, content, imageProps, toc };
};

const buildTagsCount = () => {
  const tagsCount = postFileNames.reduce<Record<string, number>>(
    (tags, fileName) => {
      const filePath = join(postsDir, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      data.tags
        .split(', ')
        .forEach((tag: string) => (tags[tag] = (tags[tag] || 0) + 1));

      return tags;
    },
    {}
  );

  return tagsCount;
};

const reorderTags = (tags: Record<string, number>) => {
  const primaryTags = [
    'JavaScript',
    'TypeScript',
    '블로그',
    '오픈 소스',
    'React.js',
    'Next.js',
    '개발 경험',
  ];

  const sortedTags: Record<string, number> = {};
  primaryTags.forEach(tag => (sortedTags[tag] = tags[tag]));
  Object.keys(tags).forEach(tag => {
    if (!sortedTags[tag]) sortedTags[tag] = tags[tag];
  });

  return sortedTags;
};

export const getPostTags = () => {
  const tagsCount = buildTagsCount();
  return reorderTags(tagsCount);
};

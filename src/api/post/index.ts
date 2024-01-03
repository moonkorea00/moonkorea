import type { FrontMatter } from '@@types/metaData';

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import { extractIntrinsicImageSize } from '@api/image';
import {
  readFileContent,
  extractHeadings,
  nestHeadingWithChildren,
} from './post.utils';
import { convertToSlug } from '@utils/markdown';

const postsDir = join(process.cwd(), '/src/_posts');
const postFileNames = fs.readdirSync(postsDir);

export const getPostPaths = () => {
  const paths = postFileNames.map(fileName => {
    const path = fileName.replace(/\.md$/, '');
    return { params: { postId: path } };
  });

  return paths;
};

export const getAllPosts = () => {
  const postFrontMatter = postFileNames.map(fileName => {
    const fileContent = readFileContent(postsDir, fileName);
    const id = fileName.replace(/\.md$/, '');
    const { data } = matter(fileContent);
    const { title, date, tags, description } = data;

    return { id, title, date, tags, description };
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
  const fileContent = readFileContent(postsDir, `${id}.md`);
  const { data, content } = matter(fileContent);

  const imageSizes = await extractIntrinsicImageSize(content);

  const headings = extractHeadings(content);
  const tocTree = nestHeadingWithChildren(headings);
  const headingSlugs = headings.map(heading => convertToSlug(heading.value));

  const toc = { tocTree, headingSlugs };

  return { id, ...data, content, imageSizes, toc };
};

const buildTagsCount = () => {
  const tagsCount = postFileNames.reduce<Record<string, number>>(
    (tags, fileName) => {
      const fileContent = readFileContent(postsDir, fileName);
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

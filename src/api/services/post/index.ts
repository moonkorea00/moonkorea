import type { FrontMatter } from '@@types/metaData';

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import { extractHeadings, nestHeadingWithChildren } from '../utils';
import { convertToSlug } from '@utils/markdown';

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

  const headings = extractHeadings(content);
  const tocTree = nestHeadingWithChildren(headings);
  const headingSlugs = headings.map(heading => convertToSlug(heading.value));

  const toc = {
    tocTree,
    headingSlugs,
  };

  return {
    id,
    ...data,
    content,
    toc,
  };
};

export const getPostTags = () => {
  const prioritizedTags = [
    'JavaScript',
    'TypeScript',
    '블로그',
    '오픈 소스',
    'React.js',
    'Next.js',
    '개발 경험',
  ];

  const tagCounts = fileNames.reduce<Record<string, number>>(
    (acc, fileName) => {
      const filePath = join(postsDir, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      data.tags.split(', ').forEach((tag: string) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });

      return acc;
    },
    {}
  );

  const ininitialTagCounts = Object.entries(tagCounts).map(([tag, count]) => ({
    tag,
    count,
  }));

  const orderedTags = prioritizedTags
    .map(pTag => ininitialTagCounts.find(item => item.tag === pTag))
    .filter(Boolean);

  const rest = ininitialTagCounts.filter(item => !orderedTags.includes(item));

  const tags = [...orderedTags, ...rest];

  return tags;
};

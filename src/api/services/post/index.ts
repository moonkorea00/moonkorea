import type { FrontMatter } from '@@types/metaData';
import type { NestedHeading } from '@components/Markdown/types';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
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

const extractHeadings = (content: string) => {
  const lines = content.split('\n');
  const headings = lines
    .filter(line => line.match(/^#{1,4}\s/))
    .map(heading => {
      const matchingHeading: string[] | null = heading.match(/^#+/);

      const level = matchingHeading ? matchingHeading[0].length : 0;
      const value = heading.replace(/^#+\s/, '');
      const slug = convertToSlug(value);

      if (level === 0) {
        throw new Error('Error finding heading level');
      }

      return { level, value, slug, children: [] };
    });

  return headings;
};

const nestHeadingWithChildren = (headings: NestedHeading[]) => {
  const root: NestedHeading[] = [];
  const stack: NestedHeading[] = [];

  headings.forEach(heading => {
    while (stack.length > 0 && heading.level <= stack[stack.length - 1].level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(heading);
    } else {
      stack[stack.length - 1].children.push(heading);
    }

    stack.push(heading);
  });

  return root;
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

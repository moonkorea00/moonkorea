/* eslint-disable @typescript-eslint/no-var-requires */
import type { NestedHeading } from '@components/Markdown/types';

import fs from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

import { convertToSlug } from '@utils/markdown';

export type ImageSizes = Record<
  string,
  { intrinsicWidth: number; intrinsicHeight: number }
>;

export const readFileContent = (dir: string, fileName: string) => {
  const filePath = join(dir, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return fileContent;
};

export const extractHeadings = (content: string) => {
  const lines = content.split('\n');
  const headings = lines
    .filter(line => line.startsWith('#'))
    .map(heading => {
      const level = heading.startsWith('#### ')
        ? 4
        : heading.startsWith('### ')
        ? 3
        : heading.startsWith('## ')
        ? 2
        : heading.startsWith('# ')
        ? 1
        : null;

      if (level === null) {
        throw new Error('Error finding heading level');
      }

      const value = heading.substring(heading.indexOf(' ') + 1);
      const slug = convertToSlug(value);

      return { level, value, slug, children: [] };
    });

  return headings;
};

export const nestHeadingWithChildren = (headings: NestedHeading[]) => {
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

export const fetchImageMetadata = (src: string) => sharp(src).metadata();

export const extractIntrinsicImageSize = async (markdown: string) => {
  const tree = fromMarkdown(markdown);
  const imageSizes: ImageSizes = {};
  const imageSources: string[] = [];

  visit(tree, 'image', node => imageSources.push(node.url));

  const imageSizePromises = imageSources.map(async url => {
    const { width, height } = await fetchImageMetadata('public' + url);
    if (width && height) {
      imageSizes[url] = {
        intrinsicWidth: width,
        intrinsicHeight: height,
      };
    }
  });
  await Promise.all(imageSizePromises);

  return imageSizes;
};

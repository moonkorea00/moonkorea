import type { NestedHeading } from '@components/Markdown/types';

import { convertToSlug } from '@utils/markdown';

export const extractHeadings = (content: string) => {
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

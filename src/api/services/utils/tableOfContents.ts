import type { NestedHeading } from '@components/Markdown/types';

import { convertToSlug } from '@utils/markdown';

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

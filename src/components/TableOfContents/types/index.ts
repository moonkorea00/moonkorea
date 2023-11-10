import { NestedHeading } from '@components/Markdown/types';

export interface TableOfContents {
  tocTree: NestedHeading[];
  headingSlugs: string[];
}

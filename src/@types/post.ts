import type { TableOfContents } from '@components/TableOfContents/types';
import type { ImageProps } from '@api/image';

export interface Post {
  id: string;
  title: string;
  tags: string;
  description: string;
  excerpt: string;
  date: string;
  content: string;
}

export type HomePost = Omit<Post, 'description' | 'content'>;

export interface PagePost extends Omit<Post, 'id' | 'tags'> {
  imageProps: ImageProps;
  toc: TableOfContents;
}

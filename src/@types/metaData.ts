export interface MetaData {
  id: string;
  title: string;
  tags: string;
  description: string;
  excerpt: string;
  date: string;
}

export type FrontMatter = Omit<MetaData, 'excerpt'>;
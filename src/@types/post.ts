export interface Post {
  id: string;
  title: string;
  tags: string;
  description: string;
  excerpt: string;
  date: string;
  content: string;
}

export type HomePost = Omit<Post, 'excerpt' | 'content'>;

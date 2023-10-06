import type { QueryKey } from "@tanstack/react-query";

export interface RawComment {
  id: string;
  body: string | null;
  userId: string;
  postId: string;
  user: User;
  parentId: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Comment extends RawComment {
  children: Comment[];
  depth: number;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export interface ReadCommentsParams {
  queryKey: QueryKey
}

export interface CreateCommentParams {
  postId: string;
  body: string;
  userId: string;
  userEmail: string;
  parentId?: string;
}

export interface UpdateCommentParams {
  id: string;
  body: string;
  postId: string;
}

export interface DeleteCommentParams {
  id: string;
  postId: string;
}

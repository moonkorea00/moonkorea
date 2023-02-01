export interface CommentProps {
  id: number;
  body: string;
  userId: number;
  postId: string;
  children: CommentProps[];
  user: UserProps;
  parentId?: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  emailVerified?: string;
  image?: string;
}

export interface createCommentParams {
  postId: string;
  body: string;
  userId: number;
  parentId?: number;
}

export interface updateCommentParams {
  id?: number;
  body?: string;
}

export interface deleteCommentParams {
  id: number;
}
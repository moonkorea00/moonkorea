export interface RawCommentProps {
  id: string;
  body: string | null;
  userId: string;
  postId: string;
  user: UserProps;
  parentId: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CommentProps extends RawCommentProps {
  children: CommentProps[];
  depth: number;
}

export interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export interface ReadCommentsParams {
  queryKey: string[];
}

export interface CreateCommentParams {
  postId: string;
  body: string;
  userId: string;
  parentId?: string;
}

export interface UpdateCommentParams {
  id: string;
  body: string;
}

export interface DeleteCommentParams {
  id: string;
}

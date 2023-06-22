import { instance } from '@api';
import {
  ReadCommentsParams,
  CreateCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
} from '@@types/comments';

export const readComments = ({ queryKey: [, id] }: ReadCommentsParams) => {
  return instance.get(`/api/comment/${id}`);
};

export const createComment = async (params: CreateCommentParams) => {
  return await instance.post('/api/comment', params);
};

export const updateComment = async (params: UpdateCommentParams) => {
  return await instance.patch('/api/comment', params);
};

export const deleteComment = async (params: DeleteCommentParams) => {
  return await instance.delete('/api/comment', { data: params });
};

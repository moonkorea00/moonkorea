import axios from 'axios';
import {
  ReadCommentsParams,
  CreateCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
} from '@@types/comments';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_ENV,
  timeout: 3000,
});

export const readComments = ({ queryKey }: ReadCommentsParams) => {
  const id = queryKey[1];
  return instance.get(`/api/comment/${id}`);
};

export const createComment = async (params: CreateCommentParams) => {
  return await instance.post('/api/comment', { ...params });
};

export const updateComment = async (params: UpdateCommentParams) => {
  return await instance.patch('/api/comment', { ...params });
};

export const deleteComment = async (params: DeleteCommentParams) => {
  return await instance.delete('/api/comment', { data: { ...params } });
};

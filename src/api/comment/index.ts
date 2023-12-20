import type {
  ReadCommentsParams,
  CreateCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
  ReadCommentsResponse,
  CreateCommentResponse,
  UpdateCommentResponse,
  DeleteCommentResponse,
} from '@@types/comments';

import { instance } from '@api/axios/instance';

export const readComments = ({ queryKey: [, id] }: ReadCommentsParams) => {
  return instance.get<ReadCommentsResponse>(`/api/comment/${id}`);
};

export const createComment = (params: CreateCommentParams) => {
  return instance.post<CreateCommentResponse>('/api/comment', params);
};

export const updateComment = (params: UpdateCommentParams) => {
  return instance.patch<UpdateCommentResponse>('/api/comment', params);
};

export const deleteComment = (params: DeleteCommentParams) => {
  return instance.delete<DeleteCommentResponse>('/api/comment', {
    data: params,
  });
};

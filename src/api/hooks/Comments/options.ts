import * as service from '@api/services/comment';
import { CACHE_KEYS } from '../ReactQuery.utils';

export const getCommentsOptions = {
  queryKey: (id: string) => CACHE_KEYS.comments.detail(id),
  queryFn: service.readComments,
};

export const createCommentOptions = {
  mutationFn: service.createComment,
  invalidationQueries: [CACHE_KEYS.comments.list],
};

export const editCommentOptions = {
  mutationFn: service.updateComment,
  invalidationQueries: [CACHE_KEYS.comments.list],
};

export const deleteCommentOptions = {
  mutationFn: service.deleteComment,
  invalidationQueries: [CACHE_KEYS.comments.list],
};
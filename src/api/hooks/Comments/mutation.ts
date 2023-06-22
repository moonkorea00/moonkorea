import { useMutation } from '../useMutation';
import {
  createCommentOptions,
  editCommentOptions,
  deleteCommentOptions,
} from './options';

export const useCreateComment = () => {
  return useMutation(createCommentOptions);
};

export const useEditComment = () => {
  return useMutation(editCommentOptions);
};

export const useDeleteComment = () => {
  return useMutation(deleteCommentOptions);
};

import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { getCommentsOptions, prefetchCommentOptions } from './options';

export const useGetComments = (id: string) => {
  return useSuspenseQuery(getCommentsOptions(id));
};

export const usePrefetchComments = (id: string) => {
  const queryClient = useQueryClient();

  const prefetchComments = () =>
    queryClient.prefetchQuery(prefetchCommentOptions(id));

  return prefetchComments;
};

import { useQueryClient } from '@tanstack/react-query';
import useQuery from '../useQuery';
import { getCommentsOptions, prefetchCommentOptions } from './options';

export const useGetComments = (id: string) => {
  return useQuery(getCommentsOptions, id);
};

export const usePrefetchComments = (id: string) => {
  const queryClient = useQueryClient();
  
  const prefetchComments = () =>
    queryClient.prefetchQuery(prefetchCommentOptions(id));

  return prefetchComments;
};

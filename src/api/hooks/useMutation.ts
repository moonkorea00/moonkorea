import type { QueryKey, UseMutationOptions } from '@tanstack/react-query';
import {
  useMutation as useMutationQuery,
  useQueryClient,
} from '@tanstack/react-query';

interface MutationOptions<
  TResponse = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> {
  mutationFn: (params: TVariables) => Promise<TResponse>;
  invalidationQueries?: QueryKey[];
  options?: UseMutationOptions<TResponse, TError, TVariables, TContext>;
}

export const useMutation = <TResponse, TError, TVariables, TContext>({
  mutationFn,
  invalidationQueries,
  options,
}: MutationOptions<TResponse, TError, TVariables, TContext>) => {
  const queryClient = useQueryClient();

  return useMutationQuery<TResponse, TError, TVariables, TContext>({
    mutationFn,
    onSuccess() {
      invalidationQueries?.forEach((queryKey: QueryKey) =>
        queryClient.invalidateQueries(queryKey)
      );
    },
    ...options,
  });
};

import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useQuery as useReactQuery } from '@tanstack/react-query';

interface QueryOptions<
  TResponse = unknown,
  TError = unknown,
  TSelectData = TResponse,
  TVariables = void
> {
  queryKey: (params: TVariables) => QueryKey;
  queryFn: QueryFunction<TResponse, QueryKey>;
  enabled?: boolean;
  options?: UseQueryOptions<TResponse, TError, TSelectData, QueryKey>;
}

const useQuery = <
  TResponse = unknown,
  TError = unknown,
  TSelectData = TResponse,
  TVariables = void
>(
  {
    queryKey,
    queryFn,
    enabled = true,
    options,
  }: QueryOptions<TResponse, TError, TSelectData, TVariables>,
  params: TVariables
) => {
  return useReactQuery<TResponse, TError, TSelectData, QueryKey>({
    queryKey: queryKey(params),
    queryFn,
    enabled,
    ...options,
  });
};

export default useQuery;

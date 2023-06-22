import useQuery from '../useQuery';
import { getCommentsOptions } from './options';

export const useGetComments = (id: string) => {
  return useQuery(getCommentsOptions, id);
};

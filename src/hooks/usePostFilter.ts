import type { FrontMatter } from '@@types/metaData';

import useSearchParams from './useSearchParams';

const key = 'tags';

const usePostFilter = (posts: FrontMatter[]) => {
  const { query, set, clear } = useSearchParams();

  const onSetFilter = (value: string) => set(key, value);

  const onResetFilter = () => clear();

  const selectedOptions = query.tags;

  const isOptionSelected = (value: string) => !!selectedOptions?.includes(value);

  const filteredPosts = query.tags?.length
    ? posts.filter(post =>
        post.tags.split(', ').some(tag => query.tags?.includes(tag))
      )
    : posts;

  return {
    filteredPosts,
    selectedOptions,
    isOptionSelected,
    onSetFilter,
    onResetFilter,
  };
};

export default usePostFilter;

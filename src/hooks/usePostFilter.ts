import type { HomePost } from '@@types/post';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const key = 'tags';

const usePostFilter = (posts: HomePost[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const values = params.getAll(key);

  const onSetFilter = (value: string) => {
    if (values.includes(value)) {
      params.delete(key);
      values.forEach(initialValue => {
        if (initialValue !== value) params.append(key, initialValue);
      });
      router.replace(pathname + '?' + params.toString());
    } else {
      params.append(key, value);
      router.replace(pathname + '?' + params.toString());
    }
  };

  const onResetFilter = () => router.replace(pathname);

  const isResettable = !!values.length;

  const isOptionSelected = (value: string) => values?.includes(value);

  const filteredPosts = values.length
    ? posts.filter(post =>
        post.tags.split(', ').some(tag => values.includes(tag))
      )
    : posts;

  return {
    filteredPosts,
    isResettable,
    isOptionSelected,
    onSetFilter,
    onResetFilter,
  };
};

export default usePostFilter;

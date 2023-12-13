import { useRouter } from 'next/router';

import { getQueryParamAsArray } from '@utils/router';

const useSearchParams = () => {
  const router = useRouter();

  const set = (key: string, value: string) => {
    const currentValuesSet = new Set(getQueryParamAsArray(router.query[key]));

    if (currentValuesSet.has(value)) {
      currentValuesSet.delete(value);
    } else {
      currentValuesSet.add(value);
    }

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, [key]: [...currentValuesSet] },
      },
      undefined,
      { shallow: true }
    );
  };

  const clear = () => {
    router.push({ pathname: router.pathname }, undefined, { shallow: true });
  };

  return {
    query: router.query,
    set,
    clear,
  };
};

export default useSearchParams;

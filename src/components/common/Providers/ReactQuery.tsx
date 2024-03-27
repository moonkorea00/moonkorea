'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isAxiosError } from 'axios';

import { useToastContext } from '@context/Toast';

import { TOAST } from '@components/Modal/Toast/toast.constants';

const ReactQueryClientProvider = ({ children }: PropsWithStrictChildren) => {
  const toast = useToastContext();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
            staleTime: 60 * 1000,
          },
          mutations: {
            onError(err) {
              toast.show({
                ...TOAST.ERROR,
                description: `문제가 발생했습니다. ${
                  isAxiosError(err) &&
                  err.response?.status &&
                  `(${err.response?.status}에러)`
                }`,
              });
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;

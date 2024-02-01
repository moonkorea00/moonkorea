'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useToastContext } from '@context/Toast';

import { TOAST } from '@components/Modal/Toast/toast.utils';

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
            onError() {
              toast.show(TOAST.ERROR);
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

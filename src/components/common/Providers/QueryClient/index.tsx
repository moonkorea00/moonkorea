import type { AppProps } from 'next/app';
import { useState } from 'react';
import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useModal from '@hooks/useModal';

interface QueryClientProviderProps {
  pageProps: AppProps['pageProps'];
}

const ReactQueryClientProvider = ({
  pageProps,
  children,
}: PropsWithStrictChildren<QueryClientProviderProps>) => {
  const { showModal } = useModal();
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: 1,
        },
        mutations: {
          onError() {
            showModal({ name: 'error' });
          },
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {children}
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;

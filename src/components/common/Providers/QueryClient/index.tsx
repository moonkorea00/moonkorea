import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useModal from '@hooks/useModal';

interface QueryClientProviderProps {
  pageProps: AppProps['pageProps'];
  children: ReactNode;
}

const ReactQueryClientProvider = ({
  pageProps,
  children,
}: QueryClientProviderProps) => {
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
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;

import type { AxiosError } from 'axios';

export type ErrorBoundaryError = Error | AxiosError | null;

export type ErrorFallbackProps = {
  err: ErrorBoundaryError;
  onRetry: () => void;
};

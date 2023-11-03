import type { AxiosError } from 'axios';

export type ErrorBoundaryError = Error | AxiosError | null;

export type ErrorFallbackProps = {
  err: ErrorBoundaryError;
  onRetry: () => void;
};

export interface MessageProps {
  err: ErrorBoundaryError;
}

export interface ActionButtonProps {
  onClickHandler: () => void;
}

import type { ErrorBoundaryError } from './types';
import { Component, ReactNode } from 'react';
import GlobalErrorFallback from './Fallback/GlobalErrorFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  err: ErrorBoundaryError | null;
}

class GlobalErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, err: null };
  }

  static getDerivedStateFromError(err: ErrorBoundaryError) {
    return { hasError: true, err };
  }

  render() {
    if (this.state.hasError) {
      return <GlobalErrorFallback />;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;

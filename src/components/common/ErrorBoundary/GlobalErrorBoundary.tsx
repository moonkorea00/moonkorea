import type { ErrorBoundaryError } from './types';
import { Component } from 'react';
import GlobalErrorFallback from './Fallback/GlobalErrorFallback';

interface ErrorBoundaryState {
  hasError: boolean;
  err: ErrorBoundaryError | null;
}

class GlobalErrorBoundary extends Component<
  PropsWithStrictChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithStrictChildren) {
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

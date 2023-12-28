import type { ErrorBoundaryError } from './types';

import { Component } from 'react';
import { isAxiosError } from 'axios';

import GlobalErrorFallback from './Fallback/GlobalErrorFallback';

import { catptureErrorWithContext } from '@utils/sentry';

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

  componentDidCatch(error: Error) {
    if (isAxiosError(error)) {
      catptureErrorWithContext(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return <GlobalErrorFallback />;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;

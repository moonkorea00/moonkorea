import type { ErrorFallbackProps, ErrorBoundaryError } from './types';
import { Component, FunctionComponent } from 'react';
import DefaultErrorFallback from './Fallback/DefaultFallback';

interface ErrorBoundaryProps {
  onReset?: () => void;
  fallback?: FunctionComponent<ErrorFallbackProps>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  err: ErrorBoundaryError;
}

const initialState = { hasError: false, err: null };

class ErrorBoundary extends Component<
  PropsWithStrictChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithStrictChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false, err: null };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(err: ErrorBoundaryError) {
    return { hasError: true, err };
  }

  resetErrorBoundary() {
    this.props.onReset?.();
    this.setState(initialState);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback ?? DefaultErrorFallback;
      return (
        <Fallback err={this.state.err} onRetry={this.resetErrorBoundary} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

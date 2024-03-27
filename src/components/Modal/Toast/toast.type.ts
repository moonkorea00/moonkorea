import { CSSProperties } from "styled-components";

export type ToastType = 'dialog' | 'error';
export type ConfirmType = 'delete';

export interface BaseToast {
  type?: ToastType;
  description?: string | JSX.Element;
  confirmLabel?: string | JSX.Element;
  confirmType?: ConfirmType;
  dismissLabel?: string;
  onConfirm?: () => void;
  duration?: number;
  persistOptions?: boolean;
  style?: CSSProperties;
}

export interface CreateToastOptions extends BaseToast {
  id?: number | string;
}

export interface ToastOptions extends BaseToast {
  id: number | string;
}

export interface Toast extends ToastOptions {
  timer: ReturnType<typeof setTimeout> | null;
}

export interface ToastPromiseOptions {
  id?: number | string;
  asyncFn: () => Promise<unknown>;
  response?: {
    loading?: {
      content?: string | JSX.Element;
      options?: CreateToastOptions;
    };
    error?: {
      content?: string | JSX.Element;
      options?: CreateToastOptions;
    };
    success?: {
      content?: string | JSX.Element;
      options?: CreateToastOptions;
    };
  };
}

export interface ToastContext {
  show: (options: CreateToastOptions) => void;
  remove: (id: number | string) => void;
  removeAll: () => void;
  promise: (promiseOptions: ToastPromiseOptions) => Promise<unknown>;
}

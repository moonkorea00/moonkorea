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
  promiseContent?: ToastPromiseOptions;
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
  id: number | string;
  fetchFn: () => Promise<unknown>;
  promiseContent?: {
    loading?: string | JSX.Element;
    error?: string | JSX.Element;
    success?: string | JSX.Element;
  };
}

export interface ToastContext {
  show: (options: CreateToastOptions) => void;
  remove: (id: number | string) => void;
  removeAll: () => void;
  promise: (promiseOptions: ToastPromiseOptions) => Promise<unknown>;
}

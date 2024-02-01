export type ToastType = 'dialog' | 'error';
export type ConfirmType = 'delete';

export interface ToastOptions {
  type?: ToastType;
  description: string;
  confirmLabel?: string;
  confirmType?: ConfirmType;
  dismissLabel?: string;
  onConfirm?: () => void;
  onCloseComplete?: () => void;
  duration?: number;
}

export interface Toast extends ToastOptions {
  id: number;
  timer: ReturnType<typeof setTimeout> | null;
}

export interface ToastContext {
  show: (options: ToastOptions) => void;
  remove: (id: number) => void;
  removeAll: () => void;
}

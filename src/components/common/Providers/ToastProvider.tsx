'use client';

import type {
  Toast,
  ToastContext,
  ToastOptions,
  CreateToastOptions,
} from '@components/Modal/Toast/toast.type';

import { useState } from 'react';

import ToastContainer from '@components/Modal/Toast/ToastContainer/ToastContainer';

import { ToastContextProvider } from '@context/Toast';

import { generateId } from '@components/Modal/Toast/toast.utils';

const ToastProvider = ({ children }: PropsWithStrictChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToastOptions = (options: CreateToastOptions) => {
    const id = options.id ?? generateId();
    const defaultOptions = {};
    let timer: Toast['timer'] = null;

    if (options.duration) {
      timer = setTimeout(() => remove(id), options.duration);
    }

    return {
      ...defaultOptions,
      ...options,
      id,
      timer,
    };
  };

  const show: ToastContext['show'] = options => {
    const isPresentToast = toasts.find(toast => toast.id === options.id);
    if (isPresentToast) return;
    setToasts(prev => [...prev, createToastOptions(options)]);
  };

  const update = (options: ToastOptions) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === options.id
          ? { ...toast, ...createToastOptions(options) }
          : toast
      )
    );
  };

  const promise: ToastContext['promise'] = async ({
    id,
    fetchFn,
    promiseContent,
  }) => {
    try {
      update({ id, confirmLabel: promiseContent?.loading });
      await fetchFn();
      remove(id);
    } catch (err) {
      remove(id);
      setToasts(prev => [
        ...prev,
        createToastOptions({ id, description: 'error' }),
      ]);
    }
  };

  const remove: ToastContext['remove'] = id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    const toastTimer = toasts.find(toast => toast.id === id)?.timer;
    if (toastTimer) clearTimeout(toastTimer);
  };

  const removeAll: ToastContext['removeAll'] = () => {
    toasts.forEach(toast => {
      if (toast.timer) clearTimeout(toast.timer);
    });
    setToasts([]);
  };

  return (
    <ToastContextProvider value={{ show, remove, removeAll, promise }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContextProvider>
  );
};

export default ToastProvider;

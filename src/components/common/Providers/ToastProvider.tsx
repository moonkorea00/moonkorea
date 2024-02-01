'use client';

import type { Toast, ToastOptions } from '@components/Modal/Toast/toast.type';

import { useState } from 'react';

import ToastContainer from '@components/Modal/Toast/ToastContainer/ToastContainer';

import { ToastContextProvider } from '@context/Toast';

import { generateId } from '@components/Modal/Toast/toast.utils';

const ToastProvider = ({ children }: PropsWithStrictChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToastOptions = (options: ToastOptions) => {
    const id = generateId();
    const defaultOptions = {};
    let timer: Toast['timer'] = null;
    if (options.duration) {
      timer = setTimeout(() => remove(id), options.duration);
    }

    return {
      id,
      ...defaultOptions,
      ...options,
      timer,
    };
  };

  const show = (options: ToastOptions) => {
    setToasts(prev => [...prev, createToastOptions(options)]);
  };

  const remove = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    const toastTimer = toasts.find(toast => toast.id === id)?.timer;
    if (toastTimer) clearTimeout(toastTimer);
  };

  const removeAll = () => {
    toasts.forEach(toast => {
      if (toast.timer) clearTimeout(toast.timer);
    });
    setToasts([]);
  };

  return (
    <ToastContextProvider value={{ show, remove, removeAll }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContextProvider>
  );
};

export default ToastProvider;

'use client';

import type { ToastContext } from '@components/Modal/Toast/toast.type';

import { createContext } from '@utils/context';

export const [ToastContextProvider, useToastContext] =
  createContext<ToastContext>({
    providerName: 'ToastContext',
  });

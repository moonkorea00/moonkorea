'use client';

import type {
  ToastContext,
  ToastOptions,
  CreateToastOptions,
} from '@components/Modal/Toast/toast.type';

import { useReducer } from 'react';

import ToastContainer from '@components/Modal/Toast/ToastContainer/ToastContainer';

import { ToastContextProvider } from '@context/Toast';
import {
  ToastActionsType,
  toastReducer,
} from '@components/Modal/Toast/toast.reducer';

import { generateId } from '@components/Modal/Toast/toast.utils';

const ToastProvider = ({ children }: PropsWithStrictChildren) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const createToastOptions = (options: CreateToastOptions) => {
    const id = options.id ?? generateId();
    const defaultOptions: CreateToastOptions = {};
    const timer = options.duration
      ? setTimeout(
          () => dispatch({ type: ToastActionsType.REMOVE, id }),
          options.duration
        )
      : null;

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
    dispatch({
      type: ToastActionsType.SHOW,
      toast: createToastOptions(options),
    });
  };

  const update = (options: ToastOptions) => {
    dispatch({
      type: ToastActionsType.UPDATE,
      id: options.id,
      toast: createToastOptions(options),
    });
  };

  const promise: ToastContext['promise'] = async ({
    id = generateId(),
    asyncFn,
    response,
  }) => {
    try {
      update({
        id,
        confirmLabel: response?.loading?.content,
        persistOptions: true,
      });
      await asyncFn();
      dispatch({ type: ToastActionsType.REMOVE, id });
    } catch (err) {
      dispatch({ type: ToastActionsType.REMOVE, id });
      if (response?.error) {
        const {
          error: { options, content },
        } = response;
        dispatch({
          type: ToastActionsType.SHOW,
          toast: createToastOptions({ ...options, description: content }),
        });
      }
    }
  };

  const remove: ToastContext['remove'] = id => {
    dispatch({ type: ToastActionsType.REMOVE, id });
  };

  const removeAll: ToastContext['removeAll'] = () => {
    dispatch({ type: ToastActionsType.REMOVE_ALL });
  };

  return (
    <ToastContextProvider value={{ show, remove, removeAll, promise }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContextProvider>
  );
};

export default ToastProvider;

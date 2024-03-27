import type { Toast } from './toast.type';

export enum ToastActionsType {
  SHOW,
  UPDATE,
  PROMISE,
  REMOVE,
  REMOVE_ALL,
}

export type ToastAction =
  | { type: ToastActionsType.SHOW; toast: Toast }
  | {
      type: ToastActionsType.UPDATE;
      id: Toast['id'];
      toast: Toast;
    }
  | { type: ToastActionsType.PROMISE; toast: Toast }
  | { type: ToastActionsType.REMOVE; id: Toast['id'] }
  | { type: ToastActionsType.REMOVE_ALL };

export const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case ToastActionsType.SHOW: {
      return [...state, action.toast];
    }
    case ToastActionsType.UPDATE: {
      return state.map(toast =>
        toast.id === action.id
          ? action.toast.persistOptions
            ? { ...toast, ...action.toast }
            : action.toast
          : toast
      );
    }
    case ToastActionsType.PROMISE: {
      return [...state];
    }
    case ToastActionsType.REMOVE: {
      clearToastTimeout(state, action.id);
      return state.filter(toast => toast.id !== action.id);
    }
    case ToastActionsType.REMOVE_ALL: {
      state.forEach(toast => clearToastTimeout(state, toast.id));
      return [];
    }
    default:
      return state;
  }
};

const clearToastTimeout = (state: Toast[], id: Toast['id']) => {
  const toastTimeout = state.find(t => t.id === id)?.timer;
  if (toastTimeout) clearTimeout(toastTimeout);
};

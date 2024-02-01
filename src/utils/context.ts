import type { Context, Provider } from 'react';

import {
  createContext as createReactContext,
  useContext as useReactContext,
} from 'react';

type CreateContextReturn<T> = [Provider<T>, () => T, Context<T>];

interface CreateContextOptions<T> {
  providerName: string;
  defaultValue?: T;
}

export const createContext = <T>(options: CreateContextOptions<T>) => {
  const { providerName, defaultValue } = options;

  const Context = createReactContext(defaultValue);

  const useContext = () => {
    const context = useReactContext(Context);
    if (!context) {
      throw new Error(`Context Error : Could not find ${providerName}`);
    }
    return context;
  };

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
};

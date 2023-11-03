import type { ReactNode } from 'react';

export declare global {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type PropsWithStrictChildren<P = {}, T extends ReactNode = ReactNode> = P & {
    children: T;
  };
}

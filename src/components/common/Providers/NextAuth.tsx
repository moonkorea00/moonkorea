'use client';

import { SessionProvider } from 'next-auth/react';

export const NextAuthSessionProvider = ({
  children,
}: PropsWithStrictChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;

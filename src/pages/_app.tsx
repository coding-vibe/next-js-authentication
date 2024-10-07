import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import SessionLogout from '@/components/SessionLogout';

export default function App({ Component, pageProps }: AppProps) {
  const { session, ...rest } = pageProps;

  return (
    <AppCacheProvider {...rest}>
      <SnackbarProvider>
        <SessionProvider session={session}>
          <SessionLogout />
          <Component {...rest} />
        </SessionProvider>
      </SnackbarProvider>
    </AppCacheProvider>
  );
}

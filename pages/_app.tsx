import '@mantine/core/styles.css';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { AppShell, Group, NativeSelect, Text } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ThemeProvider from '@/providers/ThemeProvider';
import Link from 'next/link';
import { Region } from '@/local-types';
import MenuItems from "@/components/menu-items";

export function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding='md'>
          <AppShell.Header className='header_and_footer justify-between'>
            <Link href='/'>
              <Text fw={700}>(Game) Valorant</Text>
            </Link>
            <MenuItems/>
          </AppShell.Header>
          <AppShell.Main className="m-auto max-w-7xl">
            <Component {...pageProps} />
          </AppShell.Main>
          <AppShell.Footer className='header_and_footer'>
            <Text fw={500}>Made by Moises J. Perez</Text>
          </AppShell.Footer>
        </AppShell>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

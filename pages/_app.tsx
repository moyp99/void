import '@mantine/core/styles.css';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { AppShell } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ThemeProvider from '@/providers/ThemeProvider';
import CustomAppShellHeader from '@/components/custom-app-shell-header';
import { useDisclosure } from '@mantine/hooks';
import CustomAppShellNavBar from '@/components/custom-app-shell-nav-bar';
import CustomAppShellFooter from '@/components/custom-app-shell-footer';

export function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppShell
          header={{ height: 60 }}
          footer={{ height: 60 }}
          navbar={{
            width: 280,
            breakpoint: 'sm',
            collapsed: { mobile: !opened, desktop: true }
          }}
          padding='md'
        >
          <CustomAppShellHeader opened={opened} toggle={toggle} />
          <AppShell.Main className='m-auto max-w-7xl'>
            <Component {...pageProps} />
          </AppShell.Main>
          <CustomAppShellNavBar />
          <CustomAppShellFooter />
        </AppShell>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

import { createTheme, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

const twRedValorant = fullConfig.theme?.colors?.['red-valorant'] as unknown as string;

type ThemeProviderProps = {
  children: ReactNode;
};

const theme = createTheme({
  primaryColor: 'red-valorant',
  colors: {
    // Add your color
    'red-valorant': [
      twRedValorant,
      twRedValorant,
      twRedValorant,
      twRedValorant,
      twRedValorant,
      twRedValorant,
      twRedValorant,
      twRedValorant,
      twRedValorant,
      twRedValorant
    ]
    // or replace default theme color
  }
});

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

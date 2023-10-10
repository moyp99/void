import { AppShell, Burger, Group, Stack, Text } from '@mantine/core';
import ThemeSwitch from '@/components/theme-switch';
import RegionDropdown from '@/components/region-dropdown';

export default function CustomAppShellFooter() {
  return (
    <AppShell.Footer className='header_and_footer'>
      <Text fw={500}>Made by Moises J. Perez</Text>
    </AppShell.Footer>
  );
}

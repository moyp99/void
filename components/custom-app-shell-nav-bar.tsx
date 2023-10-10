import { AppShell, Stack } from '@mantine/core';
import RegionDropdown from '@/components/region-dropdown';

export default function CustomAppShellNavBar() {
  return (
    <AppShell.Navbar className='p-4 w-[240px]'>
      <Stack>
        <RegionDropdown />
      </Stack>
    </AppShell.Navbar>
  );
}

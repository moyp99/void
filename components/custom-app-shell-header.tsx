import { AppShell, Burger, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import ThemeSwitch from '@/components/theme-switch';
import RegionDropdown from '@/components/region-dropdown';

type CustomAppShellHeaderProps = {
  opened: boolean;
  toggle: () => void;
};

export default function CustomAppShellHeader({ opened, toggle }: CustomAppShellHeaderProps) {
  return (
    <AppShell.Header className='header_and_footer justify-between'>
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <Link href='/'>
          <Text fw={700}>(Game) Valorant</Text>
        </Link>
      </Group>
      <Group gap={'1rem'} className='hidden md:flex'>
        <RegionDropdown />
          <ThemeSwitch />
      </Group>
        <div className="md:hidden">
            <ThemeSwitch />
        </div>

    </AppShell.Header>
  );
}

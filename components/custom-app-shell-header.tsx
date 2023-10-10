import { AppShell, Burger, Group, Text } from '@mantine/core';
import Link from 'next/link';
import ThemeSwitch from '@/components/theme-switch';
import RegionDropdown from '@/components/region-dropdown';
import SearchBar from "@/components/search-bar";
import {useRouter} from "next/router";

type CustomAppShellHeaderProps = {
  opened: boolean;
  toggle: () => void;
};

export default function CustomAppShellHeader({ opened, toggle }: CustomAppShellHeaderProps) {
    const router = useRouter();

  return (
    <AppShell.Header className='header_and_footer justify-between'>
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <Link href='/'>
          <Text fw={700}>Home (leaderboard)</Text>
        </Link>
      </Group>
      <Group gap={'1rem'} className='hidden md:flex'>
          {router.pathname === "/posts" ? <SearchBar/> : <Link href='/posts'><Text>Go to Posts</Text></Link>}
        <RegionDropdown />
          <ThemeSwitch />
      </Group>
        <div className="md:hidden">
            <ThemeSwitch />
        </div>

    </AppShell.Header>
  );
}

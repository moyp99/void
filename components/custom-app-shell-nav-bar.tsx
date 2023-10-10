import { AppShell, Stack, Text } from '@mantine/core';
import RegionDropdown from '@/components/region-dropdown';
import SearchBar from '@/components/search-bar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CustomAppShellNavBar() {
  const router = useRouter();

  return (
    <AppShell.Navbar className='p-4 w-[280px]'>
      <Stack>
        {router.pathname === '/posts' ? (
          <SearchBar />
        ) : (
          <Link href='/posts'>
            <Text>Go to Posts</Text>
          </Link>
        )}
        <RegionDropdown />
      </Stack>
    </AppShell.Navbar>
  );
}

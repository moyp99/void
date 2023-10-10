import { Button, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

export default function Custom404() {
  return (
    <Stack align='center' className='w-full'>
      <Title className='text-8xl text-red-valorant'>404</Title>
      <Title>Page not found</Title>
      <Link href='/'>
        <Button
          className='w-fit'
          leftSection={<ArrowUturnLeftIcon className='w-4 h-4 self-start' />}
          variant='transparent'
        >
          Go back to home page
        </Button>
      </Link>
    </Stack>
  );
}

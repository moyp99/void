import Head from 'next/head';
import {
  Avatar,
  Button,
  Container,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import ErrorCard from '@/components/error-card';
import { useGetPostByIdQuery } from '@/store/api';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Image from 'next/image';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PostByIdPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isError, isLoading } = useGetPostByIdQuery({ id: id as string });

  const { postText, postImage, authorName, authorAvatar, createdAt } = data ?? {};

  function createTitle(text: string) {
    if (text.length > 40) {
      return text.substring(0, 40) + '...';
    }
    return text;
  }

  return (
    <>
      <Head>
        <title>Post</title>
        <meta
          name='Post by Id'
          content='Explore a diverse range of insightful blog posts on topics spanning
                     technology, lifestyle, health, and more. Our expertly crafted articles provide
                      valuable insights, tips, and information to keep you informed and entertained.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {isError ? (
        <ErrorCard />
      ) : (
        <Skeleton visible={isLoading} className='w-full h-[fit]'>
          <Stack className='w-full' gap='1.5rem'>
            <Link href='/posts'>
              <Button
                className='w-fit'
                leftSection={<ArrowUturnLeftIcon className='w-4 h-4 self-start' />}
                variant='transparent'
              >
                Go back to Posts
              </Button>
            </Link>

            <Title>{createTitle(postText ?? '')}</Title>
            <Group gap='0.5rem'>
              <Avatar src={authorAvatar} alt={authorName} />
              <Stack gap='0'>
                <Text fw={500} className='leading-5'>
                  {authorName}
                </Text>
                <Text size='xs'>
                  {createdAt && dayjs(createdAt).format('MMM. DD, YYYY, hh:mm A')}
                </Text>
              </Stack>
            </Group>
            <Divider my='sm' />

            <Container className='relative flex-1 min-h-[600px] w-full max-w-full overflow-y-hidden'>
              <Image src={postImage ?? ''} className='rounded' alt='post image' fill={true} />
            </Container>

            <Text>{postText}</Text>
          </Stack>
        </Skeleton>
      )}
    </>
  );
}

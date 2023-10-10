import { Ref } from 'react';
import { useIsObserved } from '@/hooks/optimization';
import { PostData } from '@/local-types';
import { Avatar, Badge, Card, Container, Group, Skeleton, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

type ObservedPostCardProps = {
  postData: PostData;
};

export default function ObservedPostCard({
  postData: { postImage, postText, id, createdAt, authorAvatar, authorName }
}: ObservedPostCardProps) {
  const { isVisible, intersectionRef, placeholderHeight } = useIsObserved(320, 100);
  return (
    <Card
      ref={intersectionRef as Ref<HTMLDivElement>}
      p={'lg'}
      className='w-[360px] min-h-[320px] md:w-[460px]'
      shadow='md'
    >
      {isVisible ? (
        <Link href={`/posts/${id}`}>
          <Group justify='space-between' align='start' mb='xs'>
            <Group gap='0.5rem'>
              <Avatar src={authorAvatar} alt={authorName} />
              <Stack gap='0'>
                <Text fw={500} className='leading-5'>
                  {authorName}
                </Text>
                <Text size='xs'>{dayjs(createdAt).format('MMM. DD, YYYY, hh:mm A')}</Text>
              </Stack>
            </Group>
            <Badge color='red-valorant'>ID: {id}</Badge>
          </Group>

          <Text>{postText}</Text>
          <Container className='relative flex-1 min-h-[200px] w-full overflow-y-hidden'>
            <Image src={postImage ?? ''} className='rounded' alt='post image' fill={true} />
          </Container>
        </Link>
      ) : (
        <Skeleton height={placeholderHeight.current} className='w-full'></Skeleton>
      )}
    </Card>
  );
}

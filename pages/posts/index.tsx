import Head from 'next/head';
import { Title, Stack, Skeleton } from '@mantine/core';
import { useEffect } from 'react';
import { useGetPostsQuery } from '@/store/api';
import { useScrollToBottomOfWindow } from '@/hooks/scroll';
import ObservedPostCard from '@/components/observed-post-card';
import { useAppSelector } from '@/store/hooks';
import ErrorCard from '@/components/error-card';
import { INCREASE_PAGE, usePostsArgsReducer } from '@/hooks/reducers/use-posts-args-reducer';
import { usePostsReducer } from '@/hooks/reducers/use-posts-reducer';

export default function Home() {
  const search = useAppSelector((state) => state.search.search);
  const { postsArgs, dispatchPostsArgs } = usePostsArgsReducer(search);
  const { data, isLoading, isError } = useGetPostsQuery(postsArgs);
  const { posts } = usePostsReducer(data ?? [], postsArgs);
  const isBottom = useScrollToBottomOfWindow();

  useEffect(() => {
    if (isBottom) {
      dispatchPostsArgs({ type: INCREASE_PAGE });
    }
  }, [isBottom]);

  return (
    <>
      <Head>
        <title>Posts</title>
        <meta
          name='description'
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
        <Stack>
          <Title className='w-full text-center'>Latest Posts</Title>
          <Stack align='center' gap='2rem'>
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <Skeleton key={i} className='w-[360px] min-h-[320px] md:w-[460px]' />
                ))
              : posts.map((postData) => <ObservedPostCard key={postData.id} postData={postData} />)}
          </Stack>
        </Stack>
      )}
    </>
  );
}

import Head from 'next/head';
import { Card, Title, Text, Stack } from '@mantine/core';
import { useEffect, useReducer, useState } from 'react';
import { useGetPostsQuery } from '@/store/api';
import { PostData } from '@/local-types';
import { useScrollToBottomOfWindow } from '@/hooks/scroll';
import { useIsFirstRender } from '@/hooks/optimization';
import ObservedPostCard from '@/components/observed-post-card';
import { useAppSelector } from '@/store/hooks';
import ErrorCard from '@/components/error-card';

const POSTS_ADD = 'POSTS_ADD';
const POSTS_SET = 'POSTS_SET';

type PostsAction = {
  type: string;
  payload: PostData[];
};

const postsReducer = (state: PostData[], action: PostsAction) => {
  switch (action.type) {
    case POSTS_ADD:
      return [...state, ...action.payload];
    case POSTS_SET:
      return action.payload;
    default:
      return state;
  }
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(false);
  const search = useAppSelector((state) => state.search.search);
  const { data, isError } = useGetPostsQuery({ page, limit: 5, search: search }, { skip });
  const [posts, dispatchPosts] = useReducer(postsReducer, []);
  const isBottom = useScrollToBottomOfWindow();
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (data) {
      dispatchPosts({
        type: isFirstRender ? POSTS_SET : POSTS_ADD,
        payload: data
      });
    }
    setSkip(true);
  }, [data, isFirstRender, setSkip]);

  useEffect(() => {
    if (isBottom) {
      setPage((prev) => prev + 1);
    }
  }, [isBottom, setPage]);

  useEffect(() => {
    setPage(1);
    setSkip(false);
    if (!isFirstRender) dispatchPosts({ type: POSTS_SET, payload: [] });
  }, [isFirstRender, search]);

  useEffect(() => {
    setSkip(false);
  }, [page, setSkip]);

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
            {posts.map((postData) => (
              <ObservedPostCard key={postData.id} postData={postData} />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}

import { useReducer, useEffect } from 'react';
import { PostData } from '@/local-types';
import {PostsArgs} from "@/hooks/reducers/use-posts-args-reducer";

export const POSTS_ADD = 'POSTS_ADD';
export const POSTS_SET = 'POSTS_SET';

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

export const usePostsReducer = (postsData: PostData[], postsArgs: PostsArgs) => {
  const [posts, dispatchPosts] = useReducer(postsReducer, []);

  useEffect(() => {
    if (postsData) {
      dispatchPosts({
        type: postsArgs.page === 1 ? POSTS_SET :POSTS_ADD,
        payload: postsData
      });
    }
  }, [postsData]);

  return { posts, dispatchPosts };
};

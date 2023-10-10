import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LeaderboardData, MatchesByNameAndTagData, PostData } from '@/local-types';

interface GetPostsArgs {
  page: number;
  limit: number;
  search: string;
}

interface GetPostByIdArgs {
  id: string;
}

interface LeaderboardByRegionArgs {
  region: string;
  page: number;
}

interface PlayerRecentMatchesArgs {
  region: string;
  name: string;
  tagLine: string;
}

const postsBaseUrl = new URL('https://6396aee2a68e43e41808fa18.mockapi.io/api/posts');

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.henrikdev.xyz/valorant'
  }),
  endpoints: (builder) => ({
    getLeaderboardByRegion: builder.query<LeaderboardData, LeaderboardByRegionArgs>({
      query: ({ region, page }) => {
        const offsetStart = page > 0 ? 1000 * page : 0;
        return `v2/leaderboard/${region}?start=${offsetStart}`;
      },
      transformResponse: (response: any, _, { page }) => {
        const { players, ...rest } = response;
        const startIndex = page > 0 ? 1000 * page : 0;
        const endIndex = startIndex + 1000;
        const paginatedPlayers = players.slice(startIndex, endIndex);
        return { ...rest, players: paginatedPlayers };
      }
    }),
    getPlayerRecentMatches: builder.query<MatchesByNameAndTagData, PlayerRecentMatchesArgs>({
      query: ({ region, name, tagLine }) => {
        return `v3/matches/${region}/${name}/${tagLine}`;
      }
    }),
    getPosts: builder.query<PostData[], GetPostsArgs>({
      query: ({ page = 1, limit = 5, search = '' }) => {
        const queryParams = new URLSearchParams({
          sortBy: 'createdAt',
          order: 'desc',
          page: page.toString(),
          limit: limit.toString(),
          authorName: search
        });

        let newUrl = new URL(postsBaseUrl);
        newUrl.search = queryParams.toString();

        return newUrl.toString();
      }
    }),
    getPostById: builder.query<PostData, GetPostByIdArgs>({
      query: ({ id }) => {
        return `${postsBaseUrl}/${id}`;
      }
    })
  })
});

export const {
  useGetLeaderboardByRegionQuery,
  useGetPlayerRecentMatchesQuery,
  useGetPostsQuery,
  useGetPostByIdQuery
} = api;

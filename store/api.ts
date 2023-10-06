import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {LeaderboardData, MatchesByNameAndTagData} from "@/local-types";

interface LeaderboardByRegionArgs {
  region: string;
  page: number;
}

interface PlayerRecentMatchesArgs {
  region: string;
  name: string;
  tagLine: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.henrikdev.xyz/valorant'
  }),
  endpoints: (builder) => ({
    getLeaderboardByRegion: builder.query<LeaderboardData, LeaderboardByRegionArgs>({
      query: ({ region, page }) => {
        const offsetStart = (page > 0) ? (1000 * page) : 0;
        return `v2/leaderboard/${region}?start=${offsetStart}`;
      },
      transformResponse: (response: any, _, {page}) => {
        const {players, ...rest} = response;
        const startIndex = (page > 0) ? (1000 * page) : 0;
        const endIndex = startIndex + 1000;
        const paginatedPlayers = players.slice(startIndex, endIndex);
        return {...rest, players: paginatedPlayers}
      }

    }),
    getPlayerRecentMatches: builder.query<MatchesByNameAndTagData, PlayerRecentMatchesArgs>({
      query: ({ region, name, tagLine }) => {
        return `v3/matches/${region}/${name}/${tagLine}`
      }
    })
  })
});

export const {
  useGetLeaderboardByRegionQuery,
  useGetPlayerRecentMatchesQuery,
} = api;

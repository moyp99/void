import { Card, LoadingOverlay, Skeleton, Table } from '@mantine/core';
import { Dispatch, useEffect } from 'react';
import { useScrollToBottomOfWindow } from '@/hooks/scroll';
import { PlayerData } from '@/local-types';
import LeaderboardTableRows from '@/components/leaderboard-table-rows';
import {
  INCREASE_PAGE,
  LeaderboardQueryArgsActions,
  LeaderboardQueryArgsState
} from '@/hooks/reducers/use-leaderboard-query-args-reducer';
import {
  PLAYER_LIST_ADD,
  PLAYER_LIST_SET,
  usePlayerListReducer
} from '@/hooks/reducers/use-players-list-reducer';

type PlayersLeaderboardProps = {
  playersData: PlayerData[];
  totalPlayers: number;
  isFetching: boolean;
  isLoading: boolean;
  queryArgs: LeaderboardQueryArgsState;
  dispatchQueryArgs: Dispatch<LeaderboardQueryArgsActions>;
};

export default function PlayersLeaderboardContainer({
  playersData,
  totalPlayers,
  isFetching,
  isLoading,
  queryArgs,
  dispatchQueryArgs
}: PlayersLeaderboardProps) {
  const { playersList, dispatchPlayersList } = usePlayerListReducer();
  const isBottom = useScrollToBottomOfWindow();
  const isPageable = playersList.length < totalPlayers;

  //a full clean is needed when page is 0
  useEffect(() => {
    if (queryArgs.page === 0) {
      dispatchPlayersList({ type: PLAYER_LIST_SET, payload: [] });
    }
  }, [queryArgs]);

  //chain a set of players when the players list is empty
  useEffect(() => {
    if (playersList.length === 0 && playersData.length > 0 && !isFetching) {
      dispatchPlayersList({ type: PLAYER_LIST_SET, payload: playersData });
    }
  }, [playersList, playersData, isFetching]);

  //add a set of players when the page number is greater than 0
  useEffect(() => {
    if (queryArgs.page >= 1) {
      dispatchPlayersList({ type: PLAYER_LIST_ADD, payload: playersData });
    }
  }, [playersData]);

  //increase the page number when reaching the bottom of the page nad isPageable
  useEffect(() => {
    if (isBottom && isPageable && !isFetching) dispatchQueryArgs({ type: INCREASE_PAGE });
  }, [isBottom]);

  return (
    <Card shadow={'md'} className='relative p-2 min-h-[320px] flex-1 overflow-x-scroll'>
      <Table verticalSpacing='sm' striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Leaderboard Rank</Table.Th>
            <Table.Th>Game Name</Table.Th>
            <Table.Th>Competitive Tier</Table.Th>
            <Table.Th>Ranked Rating</Table.Th>
            <Table.Th>Num. of Wins</Table.Th>
            <Table.Th>tagLine</Table.Th>
            <Table.Th>Is Anonymized</Table.Th>
            <Table.Th>Is Banned</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          <LeaderboardTableRows playersList={playersList} />
        </Table.Tbody>
      </Table>

      {isLoading && <Skeleton height={300} width='100%'></Skeleton>}
      <LoadingOverlay
        visible={isFetching && !isLoading}
        className='fixed bottom-0 w-full h-full'
        opacity={0.75}
        color='#000'
        zIndex={20}
        loaderProps={{ color: 'red-valorant', type: 'bars' }}
      />
    </Card>
  );
}

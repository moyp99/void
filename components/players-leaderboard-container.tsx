import { Card, LoadingOverlay, Skeleton, Table } from '@mantine/core';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useScrollToBottomOfComponent } from '@/hooks/scroll';
import { PlayerData } from '@/local-types';
import LeaderboardTableRows from '@/components/leaderboard-table-rows';
import { useIsFirstRender } from '@/hooks/optimization';
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
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const isBottom = useScrollToBottomOfComponent(containerRef);
  const isFirstRender = useIsFirstRender();

  //I used a callback 'cause this way the ref can be updated once rendered.
  const setRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setContainerRef(node);
    }
  }, []);

  const isScrollable = containerRef && containerRef?.scrollHeight > containerRef?.clientHeight;
  const isPageable = playersList.length < totalPlayers;

  //a full clean is needed when page is 0
  useEffect(() => {
    if (queryArgs.page === 0 && !isFirstRender) {
      dispatchPlayersList({ type: PLAYER_LIST_SET, payload: [] });
    }
  }, [queryArgs]);

  useEffect(() => {
    dispatchPlayersList({ type: PLAYER_LIST_ADD, payload: playersData });
  }, [playersData]);

  //increase the page number when reaching the bottom of the page
  useEffect(() => {
    if (isScrollable && isBottom && isPageable) dispatchQueryArgs({ type: INCREASE_PAGE });
  }, [isBottom]);

  return (
    <Card ref={setRef} shadow={'md'} className='relative p-2 min-h-[320px] flex-1 overflow-scroll'>
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

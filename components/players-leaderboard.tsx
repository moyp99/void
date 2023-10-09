import { Card, LoadingOverlay, Skeleton, Table } from '@mantine/core';
import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState } from 'react';
import { useScrollToBottomOfComponent } from '@/hooks/scroll';
import { LeaderboardData, PlayerData } from '@/local-types';
import LeaderboardTableRows from '@/components/leaderboard-table-rows';
import { useAppSelector } from '@/store/hooks';
import { useIsFirstRender } from '@/hooks/optimization';

const PLAYER_LIST_ADD = 'PLAYER_LIST_ADD';
const PLAYER_LIST_SET = 'PLAYER_LIST_SET';

type PlayersLeaderboardProps = {
  data: LeaderboardData;
  setSkip: Dispatch<SetStateAction<boolean>>;
  skip: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  isFetching: boolean;
  isLoading: boolean;
};

type PlayerListAction = {
  type: string;
  payload: PlayerData[];
};

const playerListReducer = (state: PlayerData[], action: PlayerListAction) => {
  switch (action.type) {
    case PLAYER_LIST_ADD:
      return [...state, ...action.payload];
    case PLAYER_LIST_SET:
      return action.payload;
    default:
      return state;
  }
};

export default function PlayersLeaderboard({
  data,
  isFetching,
  isLoading,
  setSkip,
  setPage,
  page
}: PlayersLeaderboardProps) {
  const [playersList, dispatchPlayersList] = useReducer(playerListReducer, []);
  const region = useAppSelector((state) => state.region.region);
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
  const isPageable = data && playersList.length < data.total_players;

  //When data changes we need to add the new players to the list and avoid re-fetching the data
  useEffect(() => {
    if (data) {
      dispatchPlayersList({
        type: isFirstRender ? PLAYER_LIST_SET : PLAYER_LIST_ADD,
        payload: data.players
      });
      setSkip(true);
    }
  }, [data, setSkip]);

  //When reach to the bottom we need to update the page number, this will trigger data fetching
  //a valid containerRef is needed to check if the component is scrollable
  useEffect(() => {
    if (isBottom && isScrollable && isPageable) {
      setPage((prev) => prev + 1);
    }
  }, [isBottom, isScrollable, isPageable, setPage]);

  //it needs to reset states when region changes
  useEffect(() => {
    setPage(0);
    setSkip(false);
    if (!isFirstRender) dispatchPlayersList({ type: PLAYER_LIST_SET, payload: [] });
  }, [region, setPage, setSkip]);

  //it needs to refetch data when page changes
  useEffect(() => {
    setSkip(false);
  }, [page, setSkip]);

  return (
    <Card
      ref={setRef}
      shadow={"md"}
      className='relative p-2 min-h-[160px] max-h-[60vh] md:max-h-[50vh]
       overflow-y-scroll'
    >
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
        loaderProps={{ color: '#FF4654', type: 'bars' }}
      />
    </Card>
  );
}

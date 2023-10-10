import Head from 'next/head';
import { Card, Title, Text, Stack } from '@mantine/core';
import PlayersLeaderboardContainer from '@/components/players-leaderboard-container';
import { useAppSelector } from '@/store/hooks';
import { useGetLeaderboardByRegionQuery } from '@/store/api';
import { useEffect } from 'react';
import InfoSection from '@/components/info-section';
import { useIsFirstRender } from '@/hooks/optimization';
import { SET_REGION, useQueryArgsReducer } from '@/hooks/reducers/use-query-args-reducer';

export default function Home() {
  const region = useAppSelector((state) => state.region.region);
  const { queryArgs, dispatchQueryArgs } = useQueryArgsReducer(region);
  const isFirstRender = useIsFirstRender();
  const { data, isLoading, isError, isFetching } = useGetLeaderboardByRegionQuery(queryArgs);

  useEffect(() => {
    if (!isFirstRender) {
      dispatchQueryArgs({ type: SET_REGION, payload: region });
    }
  }, [region]);

  return (
    <>
      <Head>
        <title>(Game) Valorant - Home</title>
        <meta
          name='description'
          content='Explore the elite world of Valorant with our global leaderboard, showcasing the
          top players from around the globe. See who dominates the Valorant arena and get insights
          into their strategies. Join the pursuit of excellence in Valorant today!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Stack className='h-full min-h-[360px]'>
        <Title className='w-full text-center'>Valorant Leaderboard</Title>
        {isError ? (
          <Card>
            <Text fw={500} size='md' c='red'>
              An unexpected error occurred.
            </Text>
          </Card>
        ) : (
          <>
            <InfoSection
              immortal1Threshold={data?.immortal_1_threshold}
              immortal2Threshold={data?.immortal_2_threshold}
              immortal3Threshold={data?.immortal_3_threshold}
              radiantThreshold={data?.radiant_threshold}
              totalPlayers={data?.total_players}
              isLoading={isLoading}
            />
            <PlayersLeaderboardContainer
              queryArgs={queryArgs}
              playersData={data?.players ?? []}
              dispatchQueryArgs={dispatchQueryArgs}
              isFetching={isFetching}
              isLoading={isLoading}
              totalPlayers={data?.total_players ?? 0}
            />
          </>
        )}
      </Stack>
    </>
  );
}

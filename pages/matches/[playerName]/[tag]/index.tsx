import { useGetPlayerRecentMatchesQuery } from '@/store/api';
import Head from 'next/head';
import { Skeleton, Title, Grid, Stack } from '@mantine/core';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import MatchCard from '@/components/match-card';
import { useMediaQuery } from '@mantine/hooks';
import ErrorCard from '@/components/error-card';

export default function PlayerMatches() {
  const router = useRouter();
  const { playerName, tag } = router.query;
  const region = useAppSelector((state) => state.region.region);
  const { data, isLoading, isError } = useGetPlayerRecentMatchesQuery({
    region: region,
    name: playerName as string,
    tagLine: tag as string
  });
  const isMd = useMediaQuery('(min-width: 955px)');

  return (
    <>
      <Head>
        <title>(Game) Valorant - Player Matches</title>
        <meta
          name='description'
          content={`${playerName as string}#${tag as string}'s recent matches in Valorant.Explore 
              insights into their stats and achievements. Join the pursuit of excellence in Valorant today!`}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isError ? (
        <ErrorCard />
      ) : (
        <Stack align='center'>
          <Title className='mb-4 w-full text-center'>
            {playerName as string}#{tag as string}&apos;s recent matches
          </Title>
          <Grid pb='4rem'>
            {isLoading &&
              [1, 2, 3, 4, 5].map((num) => (
                <Grid.Col className={'flex justify-center m-auto'} key={num} span={4}>
                  <Skeleton height={360} width={300} />
                </Grid.Col>
              ))}

            {data?.data.map((match) => (
              <Grid.Col
                key={match.metadata.matchid}
                span={isMd ? 4 : 12}
                className={'flex justify-center m-auto'}
              >
                <MatchCard match={match} playerName={playerName as string} tag={tag as string} />
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )}
    </>
  );
}

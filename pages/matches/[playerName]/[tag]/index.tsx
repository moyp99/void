import { useGetPlayerRecentMatchesQuery } from '@/store/api';
import Head from 'next/head';
import { Skeleton, Title, Grid } from '@mantine/core';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import CustomCard from '@/components/custom-card';

// This should perform better if we use SSR, but rtk-query has a lots of caveats to implement it
// in SSR.

//map comes from metadata
//match duration from metadata
//match start date from metada
//players team lost or won...
//agent image and players image comes from players findbyid or name
//players KDA from player.stats
//winning team comes from rounds and need to match player team

export default function PlayerMatches() {
  const router = useRouter();
  const { playerName, tag } = router.query;
  const region = useAppSelector((state) => state.region.region);
  const { data, error, isLoading, isError } = useGetPlayerRecentMatchesQuery({
    region: region,
    name: playerName as string,
    tagLine: tag as string
  });

  return (
    <>
      <Head>
        <title>(Game) Valorant - Player Matches</title>
        <meta
          name='description'
          content='Explore the elite world of Valorant with our global leaderboard, showcasing the
             top players from around the globe. See who dominates the Valorant arena and get
              insights into their strategies. Join the pursuit of excellence in Valorant today!'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col align-center'>
        <Title className='mb-4 w-full text-center'>
          {playerName}#{tag}&apos;s recent matches
        </Title>
        <Grid>
          {isLoading &&
            [1, 2, 3, 4, 5].map((num) => (
              <Grid.Col className={'flex justify-center m-auto'} key={num} span={4}>
                <Skeleton height={360} width={300} />
              </Grid.Col>
            ))}

          {data?.data.map((match) => (
            <Grid.Col
              key={match.metadata.matchid}
              span={4}
              className={'flex justify-center m-auto'}
            >
              <CustomCard match={match} playerName={playerName as string} tag={tag as string} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </>
  );
}

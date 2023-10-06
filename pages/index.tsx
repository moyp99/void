import Head from "next/head";
import {Card, Title} from '@mantine/core';
import PlayersLeaderboard from "@/components/players-leaderboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>(Game) Valorant - Home</title>
        <meta
          name="description"
          content="Explore the elite world of Valorant with our global leaderboard, showcasing the top players from around the globe. See who dominates the Valorant arena and get insights into their strategies. Join the pursuit of excellence in Valorant today!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col align-center">
          <Title className="mb-4">Valorant Leaderboard</Title>
              <Card className="shadow-md p-2">
                  <PlayersLeaderboard/>
              </Card>
      </div>
    </>
  );
}

//TODO: implement dark/light button, change region dropdown and remove styled classes
//TODO: implement frontend pagination
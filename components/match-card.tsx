import { Avatar, Card, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, MapIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import { MatchResponse, PlayerMatchData, Players } from '@/local-types';
import StatsCard from '@/components/stats-card';

type MatchCardProps = {
  match: MatchResponse;
  playerName: string;
  tag: string;
};

export default function MatchCard({ match, playerName, tag }: MatchCardProps) {
  const findPlayerInMatch = (players: Players): PlayerMatchData | undefined => {
    return players.all_players.find((player) => player.name === playerName && player.tag === tag);
  };

  function secondsToString(seconds: number): string {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds / 60) % 60);
    const second = seconds % 60;

    const formattedHour = hour < 10 ? '0' + hour : hour.toString();
    const formattedMinute = minute < 10 ? '0' + minute : minute.toString();
    const formattedSecond = second < 10 ? '0' + second : second.toString();

    return formattedHour + ':' + formattedMinute + ':' + formattedSecond;
  }

  return (
    <Card
      className='relative w-[300px] h-[360px] overflow-x-hidden bg-card-gradient '
      shadow='md'
      padding='lg'
      radius='md'
      withBorder
    >
      <Image
        className='absolute right-[-64px] bottom-0 scale-[1.4] drop-shadow-[-5px_6px_2px_#25181854]'
        src={findPlayerInMatch(match.players)?.assets.agent.full ?? '/valorant-placeholder.png'}
        width={300}
        height={300}
        alt={findPlayerInMatch(match.players)?.character ?? 'valorant-placeholder'}
      />

      <Group justify='space-between' mb='xs'>
        <Avatar
          src={findPlayerInMatch(match.players)?.assets.card.small}
          alt={findPlayerInMatch(match.players)?.name ?? 'avatar'}
        />
        <Text className='font-krona text-white text-3xl z-10 drop-shadow-[-2px_2px_2px_#25181854]'>
          {match.teams.red.has_won && findPlayerInMatch(match.players)?.team.toLowerCase() === 'red'
            ? 'WON'
            : 'LOST'}
        </Text>
      </Group>

      <Stack>
        <StatsCard
          icon={<MapIcon className='text-white h-4 w-4 mr-1' />}
          label='Map'
          value={match.metadata.map}
        />

        <StatsCard
          icon={<CalendarIcon className='text-white h-4 w-4 mr-1' />}
          label='Date'
          value={dayjs(match.metadata.game_start_patched).format('YYYY-MM-DD HH:MM')}
        />

        <StatsCard
          icon={<ClockIcon className='text-white h-4 w-4 mr-1' />}
          label='Duration'
          value={secondsToString(match.metadata.game_length)}
        />
      </Stack>

      <Flex
        className='w-[260px] absolute bg-white bottom-0'
        direction='column'
        align='center'
        mt='md'
        mb='xs'
      >
        <Text size='sm' className='text-black'>
          Agent: {findPlayerInMatch(match.players)?.character}
        </Text>
        <Group justify='space-evenly' className='bg-black border border-white p-2 w-full'>
          <Flex direction='column' align='center'>
            <Text size='xs' className='text-white'>
              KILLS
            </Text>
            <Text size='xs' fw='700' className='text-white'>
              {findPlayerInMatch(match.players)?.stats.kills}
            </Text>
          </Flex>
          <Divider orientation='vertical' />
          <Flex direction='column' align='center'>
            <Text size='xs' className='text-white'>
              DEATHS
            </Text>
            <Text size='xs' fw='700' className='text-white'>
              {findPlayerInMatch(match.players)?.stats.deaths}
            </Text>
          </Flex>
          <Divider orientation='vertical' />
          <Flex direction='column' align='center'>
            <Text size='xs' className='text-white'>
              ASSISTS
            </Text>
            <Text size='xs' fw='700' className='text-white'>
              {findPlayerInMatch(match.players)?.stats.assists}
            </Text>
          </Flex>
        </Group>
      </Flex>
    </Card>
  );
}

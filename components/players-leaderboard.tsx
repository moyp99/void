import { Paper, Skeleton, Table, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useGetLeaderboardByRegionQuery } from '@/store/api';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useState} from "react";

export default function PlayersLeaderboard() {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const region = useAppSelector((state) => state.region.region);
  const { data, isLoading, isError, refetch } = useGetLeaderboardByRegionQuery({
    page: page,
    region: region
  });

  const onRowClick = (name: string, tagLine: string) => {
    router.push(`matches/${name}/${tagLine}`).then();
  };

  const rows =
    data &&
    data.players.map((item) => (
      <Table.Tr
        className="cursor-pointer"
        onClick={() => onRowClick(item.gameName, item.tagLine)}
        key={`${item.puuid}`}
      >
        <Table.Td>{item.leaderboardRank}</Table.Td>
        <Table.Td>{item.gameName}</Table.Td>
        <Table.Td>{item.competitiveTier}</Table.Td>
        <Table.Td>{item.rankedRating}</Table.Td>
        <Table.Td>{item.numberOfWins}</Table.Td>
        <Table.Td>{item.tagLine}</Table.Td>
        <Table.Td>{item.IsAnonymized.toString()}</Table.Td>
        <Table.Td>{item.IsBanned.toString()}</Table.Td>
      </Table.Tr>
    ));

  if (isError) {
    return (
      <Paper>
        <Text fw={500} size='md' c='red'>
          An unexpected error occurred.
        </Text>
      </Paper>
    );
  }

  return (
    <Paper>
      <Table verticalSpacing='sm'>
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

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {isLoading && <Skeleton height={300} width="100%"></Skeleton>}
    </Paper>
  );
}

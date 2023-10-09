import ObservedLeaderboardTableRow from '@/components/observed-leaderboard-table-row';
import { PlayerData } from '@/local-types';
import { useRouter } from 'next/router';

type LeaderboardTableRowsProps = {
  playersList: PlayerData[];
};
export default function LeaderboardTableRows({ playersList }: LeaderboardTableRowsProps) {
  const router = useRouter();
  const onRowClick = (name: string, tagLine: string) => {
    router.push(`matches/${name}/${tagLine}`).then();
  };

  return playersList.map((playerData) => (
    <ObservedLeaderboardTableRow
      key={`${playerData.puuid}`}
      onRowClick={() => onRowClick(playerData.gameName, playerData.tagLine)}
      playerData={playerData}
    />
  ));
}

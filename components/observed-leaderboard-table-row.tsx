import { PlayerData } from '@/local-types';
import { Table } from '@mantine/core';
import { useIsObserved } from '@/hooks/optimization';
import React, { Ref } from 'react';

type ObservedTableRowProps = {
  playerData: PlayerData;
  onRowClick: () => void;
};
export default function ObservedLeaderboardTableRow({ playerData, onRowClick }: ObservedTableRowProps) {
  const { isVisible, intersectionRef, placeholderHeight } = useIsObserved();

  return isVisible ? (
    <Table.Tr
      ref={intersectionRef as Ref<HTMLTableRowElement>}
      className='cursor-pointer'
      onClick={onRowClick}
    >
      <Table.Td>{playerData.leaderboardRank}</Table.Td>
      <Table.Td>{playerData.gameName}</Table.Td>
      <Table.Td>{playerData.competitiveTier}</Table.Td>
      <Table.Td>{playerData.rankedRating}</Table.Td>
      <Table.Td>{playerData.numberOfWins}</Table.Td>
      <Table.Td>{playerData.tagLine}</Table.Td>
      <Table.Td>{playerData.IsAnonymized.toString()}</Table.Td>
      <Table.Td>{playerData.IsBanned.toString()}</Table.Td>
    </Table.Tr>
  ) : (
    <Table.Tr style={{ height: placeholderHeight.current }} />
  );
}



import { Card, Center, Grid, Text } from '@mantine/core';
import BadgeCard from '@/components/badge-card';

interface InfoSectionProps {
  immortal1Threshold?: number;
  immortal2Threshold?: number;
  immortal3Threshold?: number;
  radiantThreshold?: number;
  totalPlayers?: number;
}

export default function InfoSection({
  immortal1Threshold,
  immortal2Threshold,
  immortal3Threshold,
  radiantThreshold,
  totalPlayers
}: InfoSectionProps) {
  return (
    <Grid py='1rem'>
      <Grid.Col span={12}>
        <Card shadow={'md'}>
          <Center>
            <Text>Total Players: {totalPlayers}</Text>
          </Center>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <BadgeCard
          title='Immortal 1'
          imageSrc='/immortal-badge.png'
          threshold={immortal1Threshold}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <BadgeCard
          title='Immortal 2'
          imageSrc='/immortal-badge.png'
          threshold={immortal2Threshold}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <BadgeCard
          title='Immortal 3'
          imageSrc='/immortal-badge.png'
          threshold={immortal3Threshold}
        />
      </Grid.Col>

      <Grid.Col span={3}>
        <BadgeCard
          title='Radiant'
          imgWidth={48}
          imgHeight={64}
          imageSrc='/radiant-badge.png'
          threshold={radiantThreshold}
        />
      </Grid.Col>
    </Grid>
  );
}

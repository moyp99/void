import { Card, Center, Grid, Group, Skeleton, Text } from '@mantine/core';
import BadgeCard from '@/components/badge-card';
import { useMediaQuery } from '@mantine/hooks';

interface InfoSectionProps {
  immortal1Threshold?: number;
  immortal2Threshold?: number;
  immortal3Threshold?: number;
  radiantThreshold?: number;
  totalPlayers?: number;
  isLoading?: boolean;
}

export default function InfoSection({
  immortal1Threshold,
  immortal2Threshold,
  immortal3Threshold,
  radiantThreshold,
  totalPlayers,
  isLoading
}: InfoSectionProps) {
  const isMd = useMediaQuery('(min-width: 768px)');

  return (
    <Grid py='1rem'>
      <Grid.Col span={12}>
        <Card shadow={'md'}>
          <Center>
            <Group gap='xs'>
              <Text>Total Players: </Text>
              {isLoading ? (
                <Skeleton w={48} h={24} />
              ) : (
                <Text size='lg' fw={700} c='red-valorant'>
                  {totalPlayers}
                </Text>
              )}
            </Group>
          </Center>
        </Card>
      </Grid.Col>

      <Grid.Col span={isMd ? 3 : 6}>
        <BadgeCard
          title='Immortal 1'
          imageSrc='/immortal-badge.png'
          threshold={immortal1Threshold}
          isLoading={isLoading}
        />
      </Grid.Col>
      <Grid.Col span={isMd ? 3 : 6}>
        <BadgeCard
          title='Immortal 2'
          imageSrc='/immortal-badge.png'
          threshold={immortal2Threshold}
          isLoading={isLoading}
        />
      </Grid.Col>
      <Grid.Col span={isMd ? 3 : 6}>
        <BadgeCard
          title='Immortal 3'
          imageSrc='/immortal-badge.png'
          threshold={immortal3Threshold}
          isLoading={isLoading}
        />
      </Grid.Col>

      <Grid.Col span={isMd ? 3 : 6}>
        <BadgeCard
          title='Radiant'
          imgWidth={42}
          imgHeight={64}
          imageSrc='/radiant-badge.png'
          threshold={radiantThreshold}
          isLoading={isLoading}
        />
      </Grid.Col>
    </Grid>
  );
}

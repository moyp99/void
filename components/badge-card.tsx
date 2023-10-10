import { Stack, Card, Text, Skeleton } from '@mantine/core';
import Image from 'next/image';

interface CardProps {
  title: string;
  imageSrc?: string;
  threshold?: number;
  imgWidth?: number;
  imgHeight?: number;
  isLoading?: boolean;
}

export default function BadgeCard({
  title,
  imageSrc,
  threshold = 0,
  imgWidth = 64,
  imgHeight = 64,
  isLoading
}: CardProps) {
  return (
    <Card shadow='md'>
      <Stack align='center' gap='0'>
        <Image
          width={imgWidth}
          height={imgHeight}
          style={{ height: `${imgHeight}px`, width: `${imgWidth}px` }}
          src={imageSrc ?? ''}
          alt={title}
        />
        <Text className={'text-center'}>{title}</Text>
        <Text className={'text-center'}>Threshold:</Text>
        {isLoading ? (
          <Skeleton w={48} h={24} />
        ) : (
          <Text size='lg' c='red-valorant' fw={700}>
            {threshold}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

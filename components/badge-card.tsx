import { Stack, Grid, Card, Text } from '@mantine/core';
import Image from 'next/image';

interface CardProps {
  title: string;
  imageSrc?: string;
  threshold?: number;
  imgWidth?: number;
  imgHeight?: number;
}

export default function BadgeCard({
  title,
  imageSrc,
  threshold,
  imgWidth = 64,
  imgHeight = 64
}: CardProps) {
  return (
      <Card shadow='md'>
        <Stack align='center' gap='xs'>
          <Image
            width={imgWidth}
            height={imgHeight}
            className={`w-[${imgWidth}px] h-[${imgHeight}px]`}
            src={imageSrc ?? ''}
            alt={title}
          />
          <Text className={"text-center"}>{title}</Text>
          <Text size='lg' c='#FF4654' fw={700}>
            {threshold}
          </Text>
        </Stack>
      </Card>
  );
}

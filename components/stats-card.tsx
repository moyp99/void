import { ReactNode } from 'react';
import { Paper, Group, Text } from '@mantine/core';

interface StatisticProps {
    icon: ReactNode;
    label: string;
    value: string;
}

const StatsCard = ({ icon, label, value }: StatisticProps) => {
    return (
<Paper p={4} className="max-w-[164px] z-10 bg-black bg-opacity-50">
    <Group gap='0' wrap='wrap'>
        <Group gap="0" mr="0.25rem">
            {icon}
            <Text c='white'>
                {label}:
            </Text>
        </Group>
        <Text c='white' fw='700'>
            {value}
        </Text>
    </Group>
</Paper>

    );
};

export default StatsCard;
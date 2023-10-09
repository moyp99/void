import { Group, Select, Switch, Text, useMantineColorScheme } from '@mantine/core';
import { Region, Theme } from '@/local-types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRegion } from '@/store/slices/region-slice';
import { useEffect, useState } from 'react';

const regionValues = Object.values(Region);

export default function NavMenuItems() {
  const [checked, setChecked] = useState(true);
  const region = useAppSelector((state) => state.region.region);
  const { setColorScheme } = useMantineColorScheme();
  const dispatch = useAppDispatch();
  const handleOnRegionChange = (value: string) => {
    if (Object.values(Region).includes(value as Region)) {
      dispatch(setRegion(value as Region));
    }
  };

  const toggleDarkMode = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (checked) {
      setColorScheme('dark');
      return;
    }
    setColorScheme('light');
  }, [checked]);

  return (
    <Group gap={'1rem'}>
      <Group gap='0.25rem'>
        <Text>Region</Text>
        <Select w='6rem' data={regionValues} value={region} onChange={handleOnRegionChange} />
      </Group>
      <Switch checked={checked} label='dark mode' onClick={toggleDarkMode} />
    </Group>
  );
}

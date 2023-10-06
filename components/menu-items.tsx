import { Group, Select, Switch, Text } from '@mantine/core';
import { Region, Theme } from '@/local-types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRegion } from '@/store/slices/region-slice';
import { setTheme } from '@/store/slices/theme-slice';

const regionValues = Object.values(Region);

export default function MenuItems() {
  const region = useAppSelector((state) => state.region.region);
  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const dispatch = useAppDispatch();
  const handleOnRegionChange = (value: string) => {
    if (Object.values(Region).includes(value as Region)) {
      dispatch(setRegion(value as Region));
    }
  };

  const toggleDarkMode = () => {
    dispatch(setTheme(themeMode === Theme.Dark ? Theme.Light : Theme.Dark));
  };
  return (
    <Group gap={"1rem"}>
      <Group gap="0.25rem">
        <Text>Region</Text>
        <Select w="6rem" data={regionValues} value={region} onChange={handleOnRegionChange} />
      </Group>
      <Switch checked={themeMode === 'dark'}  label='dark mode' onClick={toggleDarkMode} />
    </Group>
  );
}

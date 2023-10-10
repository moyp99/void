import { Group, Select, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Region } from '@/local-types';
import { setRegion } from '@/store/slices/region-slice';
const regionValues = Object.values(Region);

export default function RegionDropdown() {
  const region = useAppSelector((state) => state.region.region);

  const dispatch = useAppDispatch();
  const handleOnRegionChange = (value: string) => {
    if (Object.values(Region).includes(value as Region)) {
      dispatch(setRegion(value as Region));
    }
  };

  return (
    <Group gap='0.25rem'>
      <Text>Region</Text>
      <Select w='6rem' data={regionValues} value={region} onChange={handleOnRegionChange} />
    </Group>
  );
}

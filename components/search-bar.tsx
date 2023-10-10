import { useCallback, useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { useAppDispatch } from '@/store/hooks';
import { setSearch } from '@/store/slices/search-slice';
import { useDebounce } from '@/hooks/optimization';

const SearchBar = () => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 500);
  const dispatch = useAppDispatch();

  const searchCallback = useCallback(async () => {
    dispatch(setSearch(debouncedValue));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    searchCallback().then();
  }, [debouncedValue, searchCallback]);

  return (
    <TextInput
      w={240}
      placeholder="Search posts by author's name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      radius='xl'
    />
  );
};

export default SearchBar;

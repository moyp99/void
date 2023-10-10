import { Switch, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [checked, setChecked] = useState(true);
  const { setColorScheme } = useMantineColorScheme();
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
    <Switch checked={checked} size='lg' onLabel='dark' offLabel='light' onClick={toggleDarkMode} />
  );
}

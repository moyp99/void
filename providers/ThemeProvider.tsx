import {useAppSelector} from "@/store/hooks";
import {MantineProvider} from "@mantine/core";
import {ReactNode} from "react";

type ThemeProviderProps = {
    children: ReactNode
}

export default function ThemeProvider({children}:ThemeProviderProps ){
    const themeMode = useAppSelector((state) => state.theme.themeMode);
    return  <MantineProvider forceColorScheme={themeMode}>{children}</MantineProvider>
}
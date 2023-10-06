import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Theme} from "@/local-types";

interface ThemeState {
  themeMode: Theme
}

const initialState: ThemeState = {
  themeMode: Theme.Dark
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Region} from "@/local-types";

interface ThemeState {
  region: Region;
}

const initialState: ThemeState = {
    region: Region.NA
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<Region>) => {
      state.region = action.payload;
    }
  }
});

export const { setRegion } = regionSlice.actions;
export default regionSlice;

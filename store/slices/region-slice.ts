import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Region} from "@/local-types";

interface RegionState {
  region: Region;
}

const initialState: RegionState = {
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

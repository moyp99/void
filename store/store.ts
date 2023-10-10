import { configureStore } from '@reduxjs/toolkit';
import regionSlice from '@/store/slices/region-slice';
import { api } from '@/store/api';
import searchSlice from '@/store/slices/search-slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    region: regionSlice.reducer,
    search: searchSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

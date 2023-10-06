import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import themeSlice from './slices/theme-slice';
import regionSlice from "@/store/slices/region-slice";

export const store = configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            theme: themeSlice.reducer,
            region: regionSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

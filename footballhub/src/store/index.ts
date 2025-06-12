import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import teamsReducer from './slices/teamsSlice';
import playersReducer from './slices/playersSlice';
import championshipsReducer from './slices/championshipsSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    teams: teamsReducer,
    players: playersReducer,
    championships: championshipsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
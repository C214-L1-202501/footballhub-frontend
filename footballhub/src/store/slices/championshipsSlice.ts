import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { Championship, ApiResponse } from '../../types';

interface ChampionshipsState {
  championships: ApiResponse<Championship[]>;
}

const initialState: ChampionshipsState = {
  championships: { data: [], loading: false, error: null },
};

export const fetchChampionships = createAsyncThunk('championships/fetchAll', async () => {
  const response = await api.getChampionships();
  return response.data;
});

const championshipsSlice = createSlice({
  name: 'championships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampionships.pending, (state) => {
        state.championships.loading = true;
        state.championships.error = null;
      })
      .addCase(fetchChampionships.fulfilled, (state, action) => {
        state.championships.loading = false;
        state.championships.data = action.payload;
      })
      .addCase(fetchChampionships.rejected, (state, action) => {
        state.championships.loading = false;
        state.championships.error = action.error.message || 'Failed to fetch championships';
      });
  },
});

export default championshipsSlice.reducer;
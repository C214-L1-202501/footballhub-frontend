import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { Player, ApiResponse } from '../../types';

interface PlayersState {
  players: ApiResponse<Player[]>;
  currentPlayer: ApiResponse<Player | null>;
}

const initialState: PlayersState = {
  players: { data: [], loading: false, error: null },
  currentPlayer: { data: null, loading: false, error: null },
};

export const fetchPlayers = createAsyncThunk('players/fetchAll', async () => {
  const response = await api.getPlayers();
  return response.data;
});

export const fetchPlayer = createAsyncThunk('players/fetchOne', async (id: number) => {
  const response = await api.getPlayer(id);
  return response.data;
});

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.players.loading = true;
        state.players.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.players.loading = false;
        state.players.data = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.players.loading = false;
        state.players.error = action.error.message || 'Failed to fetch players';
      })
      .addCase(fetchPlayer.pending, (state) => {
        state.currentPlayer.loading = true;
        state.currentPlayer.error = null;
      })
      .addCase(fetchPlayer.fulfilled, (state, action) => {
        state.currentPlayer.loading = false;
        state.currentPlayer.data = action.payload;
      })
      .addCase(fetchPlayer.rejected, (state, action) => {
        state.currentPlayer.loading = false;
        state.currentPlayer.error = action.error.message || 'Failed to fetch player';
      });
  },
});

export default playersSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { Team, Player, TeamParticipation, ApiResponse } from '../../types';

interface TeamsState {
  teams: ApiResponse<Team[]>;
  currentTeam: ApiResponse<Team | null>;
  teamPlayers: ApiResponse<Player[]>;
  teamParticipations: ApiResponse<TeamParticipation[]>;
}

const initialState: TeamsState = {
  teams: { data: [], loading: false, error: null },
  currentTeam: { data: null, loading: false, error: null },
  teamPlayers: { data: [], loading: false, error: null },
  teamParticipations: { data: [], loading: false, error: null },
};

export const fetchTeams = createAsyncThunk('teams/fetchAll', async () => {
  const response = await api.getTeams();
  return response.data;
});

export const fetchTeam = createAsyncThunk('teams/fetchOne', async (id: number) => {
  const response = await api.getTeam(id);
  return response.data;
});

export const fetchTeamPlayers = createAsyncThunk('teams/fetchPlayers', async (id: number) => {
  const response = await api.getTeamPlayers(id);
  return response.data;
});

export const fetchTeamParticipations = createAsyncThunk('teams/fetchParticipations', async (id: number) => {
  const response = await api.getTeamParticipations(id);
  return response.data;
});

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.teams.loading = true;
        state.teams.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teams.loading = false;
        state.teams.data = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.teams.loading = false;
        state.teams.error = action.error.message || 'Failed to fetch teams';
      })
      .addCase(fetchTeam.pending, (state) => {
        state.currentTeam.loading = true;
        state.currentTeam.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.currentTeam.loading = false;
        state.currentTeam.data = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.currentTeam.loading = false;
        state.currentTeam.error = action.error.message || 'Failed to fetch team';
      })
      .addCase(fetchTeamPlayers.pending, (state) => {
        state.teamPlayers.loading = true;
        state.teamPlayers.error = null;
      })
      .addCase(fetchTeamPlayers.fulfilled, (state, action) => {
        state.teamPlayers.loading = false;
        state.teamPlayers.data = action.payload;
      })
      .addCase(fetchTeamPlayers.rejected, (state, action) => {
        state.teamPlayers.loading = false;
        state.teamPlayers.error = action.error.message || 'Failed to fetch team players';
      })
      .addCase(fetchTeamParticipations.pending, (state) => {
        state.teamParticipations.loading = true;
        state.teamParticipations.error = null;
      })
      .addCase(fetchTeamParticipations.fulfilled, (state, action) => {
        state.teamParticipations.loading = false;
        state.teamParticipations.data = action.payload;
      })
      .addCase(fetchTeamParticipations.rejected, (state, action) => {
        state.teamParticipations.loading = false;
        state.teamParticipations.error = action.error.message || 'Failed to fetch team participations';
      });
  },
});

export default teamsSlice.reducer;
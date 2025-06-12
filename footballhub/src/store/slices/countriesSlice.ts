import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { Country, Team, Player, Stadium, ApiResponse } from '../../types';

interface CountriesState {
  countries: ApiResponse<Country[]>;
  currentCountry: ApiResponse<Country | null>;
  countryTeams: ApiResponse<Team[]>;
  countryPlayers: ApiResponse<Player[]>;
  countryStadiums: ApiResponse<Stadium[]>;
}

const initialState: CountriesState = {
  countries: { data: [], loading: false, error: null },
  currentCountry: { data: null, loading: false, error: null },
  countryTeams: { data: [], loading: false, error: null },
  countryPlayers: { data: [], loading: false, error: null },
  countryStadiums: { data: [], loading: false, error: null },
};

export const fetchCountries = createAsyncThunk('countries/fetchAll', async () => {
  const response = await api.getCountries();
  return response.data;
});

export const fetchCountry = createAsyncThunk('countries/fetchOne', async (id: number) => {
  const response = await api.getCountry(id);
  return response.data;
});

export const fetchCountryTeams = createAsyncThunk('countries/fetchTeams', async (id: number) => {
  const response = await api.getCountryTeams(id);
  return response.data;
});

export const fetchCountryPlayers = createAsyncThunk('countries/fetchPlayers', async (id: number) => {
  const response = await api.getCountryPlayers(id);
  return response.data;
});

export const fetchCountryStadiums = createAsyncThunk('countries/fetchStadiums', async (id: number) => {
  const response = await api.getCountryStadiums(id);
  return response.data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.countries.loading = true;
        state.countries.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries.loading = false;
        state.countries.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countries.loading = false;
        state.countries.error = action.error.message || 'Failed to fetch countries';
      })
      .addCase(fetchCountry.pending, (state) => {
        state.currentCountry.loading = true;
        state.currentCountry.error = null;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.currentCountry.loading = false;
        state.currentCountry.data = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.currentCountry.loading = false;
        state.currentCountry.error = action.error.message || 'Failed to fetch country';
      })
      .addCase(fetchCountryTeams.pending, (state) => {
        state.countryTeams.loading = true;
        state.countryTeams.error = null;
      })
      .addCase(fetchCountryTeams.fulfilled, (state, action) => {
        state.countryTeams.loading = false;
        state.countryTeams.data = action.payload;
      })
      .addCase(fetchCountryTeams.rejected, (state, action) => {
        state.countryTeams.loading = false;
        state.countryTeams.error = action.error.message || 'Failed to fetch country teams';
      })
      .addCase(fetchCountryPlayers.pending, (state) => {
        state.countryPlayers.loading = true;
        state.countryPlayers.error = null;
      })
      .addCase(fetchCountryPlayers.fulfilled, (state, action) => {
        state.countryPlayers.loading = false;
        state.countryPlayers.data = action.payload;
      })
      .addCase(fetchCountryPlayers.rejected, (state, action) => {
        state.countryPlayers.loading = false;
        state.countryPlayers.error = action.error.message || 'Failed to fetch country players';
      })
      .addCase(fetchCountryStadiums.pending, (state) => {
        state.countryStadiums.loading = true;
        state.countryStadiums.error = null;
      })
      .addCase(fetchCountryStadiums.fulfilled, (state, action) => {
        state.countryStadiums.loading = false;
        state.countryStadiums.data = action.payload;
      })
      .addCase(fetchCountryStadiums.rejected, (state, action) => {
        state.countryStadiums.loading = false;
        state.countryStadiums.error = action.error.message || 'Failed to fetch country stadiums';
      });
  },
});

export default countriesSlice.reducer;
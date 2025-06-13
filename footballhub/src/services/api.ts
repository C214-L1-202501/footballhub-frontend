import axios from 'axios';
import { type Country, type Team, type Player, type Stadium, type Championship, type TeamParticipation } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Countries
export const getCountries = () => api.get<Country[]>('/country/');
export const getCountry = (id: number) => api.get<Country>(`/country/${id}/`);
export const getCountryTeams = (id: number) => api.get<Team[]>(`/country/${id}/teams`);
export const getCountryPlayers = (id: number) => api.get<Player[]>(`/country/${id}/players`);
export const getCountryStadiums = (id: number) => api.get<Stadium[]>(`/country/${id}/stadiums`);

// Teams
export const getTeams = () => api.get<Team[]>('/teams/');
export const getTeam = (id: number) => api.get<Team>(`/teams/${id}/`);
export const getTeamPlayers = (id: number) => api.get<Player[]>(`/teams/${id}/players`);
export const getTeamParticipations = (id: number) => api.get<TeamParticipation[]>(`/teams/${id}/participations`);

// Players
export const getPlayers = () => api.get<Player[]>('/players/');
export const getPlayer = (id: number) => api.get<Player>(`/players/${id}/`);

// Championships
export const getChampionships = () => api.get<Championship[]>('/championship/');

// Stadiums
export const getStadiums = () => api.get<Stadium[]>('/stadiums/');

export default api;
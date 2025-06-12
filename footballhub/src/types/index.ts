export interface Country {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  nickname?: string;
  city: string;
  founding_date: string;
  country: number;
}

export interface Player {
  id: number;
  name: string;
  birth_date: string;
  country: number;
  position: string;
  team?: number;
}

export interface Stadium {
  id: number;
  name: string;
  capacity: number;
  city: string;
  country: number;
}

export interface Championship {
  id: number;
  name: string;
  season: string;
  country: number;
}

export interface TeamParticipation {
  team: number;
  championship: number;
  season: string;
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
export interface MovieContent {
  imdbID: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear: number;
  runtimeMinutes: number;
  genres: string[];
  averageRating: number;
  totalVotes: number;
  poster: string;
}

export interface Movie {
  imdbID: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear: number;
  runtimeMinutes: number;
  genres: string[];
  averageRating: number;
  totalVotes: number;
  poster: string;
  favorited: boolean;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

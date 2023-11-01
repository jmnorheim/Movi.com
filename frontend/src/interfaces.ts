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
  userID: string;
  username: string;
  email: string;
  password: string;
  favorites: string[];
  library: Library[];
}

export interface Library {
  name: string;
  movies: string[];
}

export interface CurrentFilter {
  isAdult?: boolean;
  genres?: string[];
}

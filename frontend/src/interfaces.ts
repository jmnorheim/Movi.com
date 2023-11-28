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

export interface MovieData {
  movies: MovieContent[];
  count: number;
  genres: string[];
}

export interface MovieStats {
  releaseYearRange: { min: number; max: number };
  runtimeMinutesRange: { min: number; max: number };
  averageRatingRange: { min: number; max: number };
  totalVotesRange: { min: number; max: number };
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
  libraryID: string;
}

export interface CurrentFilter {
  isAdult?: boolean;
  genres?: string[];
}

export interface FilterState {
  yearRange: number[];
  runtimeRange: number[];
  ratingRange: number[];
  totalVotesRange: number[];
  isAdult: boolean;
  selectedGenres: Set<string>;
}

export const SERVER_URL = " http://192.168.50.114:4000/";
// http://localhost:4000/
// http://it2810-29.idi.ntnu.no:4000

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

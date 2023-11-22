import * as math from "mathjs";
import { Movie } from "../generated/resolvers-types";

function calculateSimilarity(movie1: Movie, movie2: Movie): number {
  let genres = Array.from(new Set([...movie1.genres, ...movie2.genres]));

  let vector1: number[] = genres.map((genre) =>
    movie1.genres.includes(genre) ? 1 : 0
  );
  let vector2: number[] = genres.map((genre) =>
    movie2.genres.includes(genre) ? 1 : 0
  );

  let vector1Matrix = math.matrix(vector1);
  let vector2Matrix = math.matrix(vector2);

  let dotProduct = math.dot(vector1Matrix, vector2Matrix) as number;
  let norm1 = math.norm(vector1Matrix) as number;
  let norm2 = math.norm(vector2Matrix) as number;

  // Check for zero norm to avoid division by zero
  if (norm1 === 0 || norm2 === 0) {
    return 0;
  }

  return dotProduct / (norm1 * norm2);
}

export function getRecommendations(
  targetMovie: Movie,
  allMovies: Movie[],
  topN: number = 5
): Movie[] {
  return allMovies
    .map((movie) => ({
      movie,
      similarity: calculateSimilarity(targetMovie, movie),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN)
    .map((item) => item.movie);
}

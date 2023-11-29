import * as math from "mathjs";
import { Movie } from "../generated/resolvers-types";

/**
 * Calculates the similarity between two movies based on their genres.
 * The similarity is computed using the cosine similarity formula.
 *
 * @param {Movie} movie1 - The first movie to compare.
 * @param {Movie} movie2 - The second movie to compare.
 * @returns {number} A number representing the similarity between the two movies (ranging from 0 to 1).
 */
const calculateSimilarity = (movie1: Movie, movie2: Movie): number => {
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
};

/**
 * Generates movie recommendations based on genre similarity to a target movie.
 *
 * This function compares a target movie to a list of all movies, calculating similarity scores for each.
 * It returns the top N movies with the highest similarity scores to the target movie.
 *
 * @param {Movie} targetMovie - The movie to compare against for recommendations.
 * @param {Movie[]} allMovies - An array of all available movies for comparison.
 * @param {number} [topN=5] - The number of top similar movies to return (default is 5).
 * @returns {Movie[]} An array of movies, sorted by their similarity to the target movie.
 *
 * @remarks
 * - Utilizes the `calculateSimilarity` function to compute similarity scores.
 * - Can be used to implement a simple movie recommendation feature based on genre similarity.
 */
export const getRecommendations = (
  targetMovie: Movie,
  allMovies: Movie[],
  topN: number = 5
): Movie[] => {
  return allMovies
    .map((movie) => ({
      movie,
      similarity: calculateSimilarity(targetMovie, movie),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN)
    .map((item) => item.movie);
};

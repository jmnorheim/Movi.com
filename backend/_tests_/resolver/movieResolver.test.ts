import { describe, it, expect, beforeEach, vi } from "vitest";
import { movieResolver } from "../../graphql/resolver/movieResolver";
import { Context } from "../../src";

/**
 * Tests queries and mutations in movieResolver.
 */
describe("movieResolver", () => {
  let mockContext;

  /**
   *  Sets up mocked methods for user.
   */
  beforeEach(() => {
    mockContext = setupMockMovieContext();
    vi.clearAllMocks();
  });

  /**
   * Querys
   */
  describe("Query", () => {
    /**
     * Query: movie - Fetches a single movie by IMDb ID.
     */
    it("Query: movie - Fetches a single movie by IMDb ID.", async () => {
      const mockMovie = {
        imdbID: "tt1234567",
        title: "Test Movie",
        MovieGenre: [{ Genre: { genreName: "Mock Genre" } }],
        genres: ["Mock Genre"],
      };

      mockContext.prisma.movie.findUnique.mockResolvedValue(mockMovie);

      const result = await movieResolver.Query.movie(
        null,
        { imdbID: "tt1234567" },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { imdbID: "tt1234567" },
        include: {
          MovieGenre: { select: { Genre: { select: { genreName: true } } } },
        },
      });
      expect(result).toEqual(mockMovie);
    });

    /**
     * Query: movies - Fetches a list of movies with filters and pagination.
     */
    it("Query: movies - Fetches a list of movies with filters and pagination.", async () => {
      const mockMovies = [
        { imdbID: "movie1", title: "Movie 1", MovieGenre: [] },
        { imdbID: "movie2", title: "Movie 2", MovieGenre: [] },
      ];
      const mockGenres = ["Genre1", "Genre2"];
      const filter = {};
      const limit = 2;
      const offset = 0;
      const sortBy = "TitleAZ";

      mockContext.prisma.movie.findMany.mockResolvedValue(mockMovies);
      mockContext.prisma.movie.count.mockResolvedValue(mockMovies.length);
      mockContext.prisma.genre.findMany.mockResolvedValue(
        mockGenres.map((genre) => ({ genreName: genre }))
      );

      const result = await movieResolver.Query.movies(
        null,
        { filter, limit, offset, sortBy },
        mockContext as unknown as Context
      );

      expect(result.movies).toEqual(
        mockMovies.map((m) => ({ ...m, genres: [] }))
      );
      expect(result.count).toEqual(mockMovies.length);
    });
  });

  /**
   * Query: movieStats - Returns aggregated statistics for movies.
   */
  it("Query: movieStats - Returns aggregated statistics for movies.", async () => {
    const mockStats = {
      releaseYearRange: { min: 1990, max: 2020 },
      runtimeMinutesRange: { min: 80, max: 180 },
      averageRatingRange: { min: 3.0, max: 9.0 },
      totalVotesRange: { min: 100, max: 50000 },
    };

    mockContext.prisma.movie.aggregate.mockImplementation((args) => {
      if (args._min && args._min.startYear) {
        return Promise.resolve({
          _min: { startYear: 1990 },
          _max: { startYear: 2020 },
        });
      }
      if (args._min && args._min.runtimeMinutes) {
        return Promise.resolve({
          _min: { runtimeMinutes: 80 },
          _max: { runtimeMinutes: 180 },
        });
      }
      if (args._min && args._min.averageRating) {
        return Promise.resolve({
          _min: { averageRating: 3.0 },
          _max: { averageRating: 9.0 },
        });
      }
      if (args._min && args._min.totalVotes) {
        return Promise.resolve({
          _min: { totalVotes: 100 },
          _max: { totalVotes: 50000 },
        });
      }
      return Promise.reject(new Error("Invalid aggregate query"));
    });

    const result = await movieResolver.Query.movieStats(
      null,
      {},
      mockContext as unknown as Context
    );

    expect(result).toEqual(mockStats);
  });
});

// Helper functions ===============================================================

/**
 *  Sets up mocked methods for movie.
 */
const setupMockMovieContext = () => {
  return {
    prisma: {
      movie: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        aggregate: vi.fn(),
      },
      genre: {
        findMany: vi.fn(),
      },
      movieGenre: {
        findMany: vi.fn(),
      },
    },
  };
};

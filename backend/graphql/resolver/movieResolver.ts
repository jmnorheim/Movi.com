import {
  MovieFilter,
  MoviesData,
  Resolvers,
} from "../../generated/resolvers-types";
import { Context } from "../../src";
import { getRecommendations } from "../../src/recommended.js";

export const movieResolver: Resolvers = {
  Query: {
    /**
     * Fetches a single movie by its IMDb ID.
     *
     * @param {object} _ - The root object, which remains unused
     * @param {string} imdbID - The IMDb ID of the movie.
     * @param {Context} context - The context object which gives access to Prisma.
     * @returns {Promise<Movie>} An object representing the movie, or an error if something goes wrong.
     * @throws Will throw an error if the database query fails.
     */
    movie: async (_, { imdbID }, context: Context) => {
      try {
        const movie = await context.prisma.movie.findUnique({
          where: { imdbID: imdbID },
        });
        const genres = await context.prisma.movieGenre.findMany({
          where: { imdbID: imdbID },
          select: {
            Genre: true,
          },
        });

        if (!movie) {
          throw new Error(`Movie with imdbID ${imdbID} not found`);
        }

        const movieWithGenres = {
          ...movie,
          genres: genres.map((genre) => genre.Genre.genreName),
        };
        return movieWithGenres;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },

    /**
     * Fetches a list of movies based on various filter conditions and search criteria.
     *
     * @param {object} _ - The root object, which remains unused.
     * @param {number} offset - The number of records (movies) to skip for pagination.
     * @param {number} limit - The maximum number of records (movies) to return.
     * @param {string} searchBy - A search string to filter movies by primaryTitle, originalTitle or imdbID.
     * @param {MovieFilter} filter - Various filters to apply, contains isAdult, releaseYearRange, runtimeMinutesRange, averageRatingRange, totalVotesRange and genres.
     * @param {Context} context - The context object which gives access to Prisma.
     * @returns {Promise<MoviesData>} An array of objects representing the list of movies, or an error if something goes wrong.
     * @throws Will throw an error if the database query fails.
     */
    movies: async (
      _,
      { filter, limit, searchBy, offset, sortBy },
      context: Context
    ) => {
      let orderBy;

      // Determine the sorting order based on the sortBy argument
      if (sortBy) {
      }
      switch (sortBy) {
        case "TitleAZ":
          orderBy = { primaryTitle: "asc" };
          break;
        case "TitleZA":
          orderBy = { primaryTitle: "desc" };
          break;
        case "RatingHILO":
          orderBy = { averageRating: "desc" };
          break;
        case "RatingLOHI":
          orderBy = { averageRating: "asc" };
          break;
        case "DurationHILO":
          orderBy = { runtimeMinutes: "desc" };
          break;
        case "DurationLOHI":
          orderBy = { runtimeMinutes: "asc" };
          break;
        case "YearHILO":
          orderBy = { startYear: "desc" };
          break;
        case "YearLOHI":
          orderBy = { startYear: "asc" };
          break;
        default:
          orderBy = { totalVotes: "desc" };
          break;
      }

      const whereConditions = {
        AND: [
          { isAdult: { equals: filter?.isAdult } },
          { startYear: { gte: filter?.releaseYearRange?.min } },
          { startYear: { lte: filter?.releaseYearRange?.max } },
          {
            runtimeMinutes: { gte: filter?.runtimeMinutesRange?.min },
          },
          {
            runtimeMinutes: { lte: filter?.runtimeMinutesRange?.max },
          },
          { averageRating: { gte: filter?.averageRatingRange?.min } },
          { averageRating: { lte: filter?.averageRatingRange?.max } },
          { totalVotes: { gte: filter?.totalVotesRange?.min } },
          { totalVotes: { lte: filter?.totalVotesRange?.max } },
          filter.genres?.length > 0
            ? {
                MovieGenre: {
                  some: {
                    Genre: {
                      genreName: {
                        in: filter?.genres,
                      },
                    },
                  },
                },
              }
            : {},

          {
            OR: [
              { imdbID: { contains: searchBy } },
              { primaryTitle: { contains: searchBy } },
              { originalTitle: { contains: searchBy } },
            ],
          },
        ],
      };

      try {
        // For future combine more of the queries into one

        // Get all the genres to filter on
        const genre = await context.prisma.genre.findMany({
          select: {
            genreName: true,
          },
        });

        const genres = new Set<string>();
        genre.forEach((gen) => {
          genres.add(gen.genreName);
        });

        // The main query for fetching movies
        const movies = await context.prisma.movie.findMany({
          where: whereConditions,
          orderBy: orderBy,
          skip: offset ? offset : 0,
          take: limit ? limit : 10,
          include: {
            MovieGenre: {
              include: {
                Genre: true,
              },
            },
          },
        });

        const totalMovies = await context.prisma.movie.count({
          where: whereConditions,
        });

        const moviesWithGenres = movies.map((movie) => ({
          ...movie,
          genres: movie.MovieGenre.map((mg) => mg.Genre.genreName),
        }));

        const moviesData: MoviesData = {
          movies: moviesWithGenres,
          count: totalMovies,
          genres: Array.from(genres),
        };
        return moviesData;
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },

    /**
     * Calculates and fetches the maximum and minimum values for various movie properties to be used for filtering.
     * This includes the release year, runtime in minutes, average rating, and total number of votes.
     *
     * @param {object} _ - The root object, which remains unused.
     * @param {object} __ - The arguments (args) object, which remains unused as this query does not require any input parameters.
     * @param {Context} context - The context object which provides access to Prisma and other necessary back-end functionalities.
     * @returns {Promise<MovieStats>} A promise that resolves to an object containing the aggregated statistics of movies in the database.
     * Each property of the returned object is an object itself with 'min' and 'max' properties indicating the range for each field.
     *
     * @example
     * // Example of returned object:
     * {
     *   releaseYearRange: { min: 1980, max: 2023 },
     *   runtimeMinutesRange: { min: 80, max: 180 },
     *   averageRatingRange: { min: 2.5, max: 9.8 },
     *   totalVotesRange: { min: 100, max: 1000000 }
     * }
     *
     * @throws Will throw an error if the database query fails.
     */
    movieStats: async (_, __, context: Context) => {
      try {
        // Aggregate the data for each field
        const releaseYearAggregates = await context.prisma.movie.aggregate({
          _min: { startYear: true },
          _max: { startYear: true },
        });

        const runtimeMinutesAggregates = await context.prisma.movie.aggregate({
          _min: { runtimeMinutes: true },
          _max: { runtimeMinutes: true },
        });

        const averageRatingAggregates = await context.prisma.movie.aggregate({
          _min: { averageRating: true },
          _max: { averageRating: true },
        });

        const totalVotesAggregates = await context.prisma.movie.aggregate({
          _min: { totalVotes: true },
          _max: { totalVotes: true },
        });

        // Construct the response
        return {
          releaseYearRange: {
            min: releaseYearAggregates._min.startYear,
            max: releaseYearAggregates._max.startYear,
          },
          runtimeMinutesRange: {
            min: runtimeMinutesAggregates._min.runtimeMinutes,
            max: runtimeMinutesAggregates._max.runtimeMinutes,
          },
          averageRatingRange: {
            min: averageRatingAggregates._min.averageRating,
            max: averageRatingAggregates._max.averageRating,
          },
          totalVotesRange: {
            min: totalVotesAggregates._min.totalVotes,
            max: totalVotesAggregates._max.totalVotes,
          },
        };
      } catch (error) {
        throw new Error(`Error in movieStats resolver: ${error.message}`);
      }
    },
    /**
     * Provides personalized movie recommendations based on a target movie.
     * It considers various attributes like age rating, year, runtime, and average rating for the recommendation process.
     * Additionally, it enriches each movie with genre data for more precise recommendations.
     *
     * @param {object} _ - The root object, which remains unused in this resolver.
     * @param {Movie} movie - The movie object used as the basis for finding similar movies.
     * @param {Context} context - The GraphQL context object, providing access to the Prisma client for database interactions.
     * @returns {Promise<Movie[]>} A promise that resolves to an array of movies recommended based on the target movie.
     *
     * @throws {Error} Throws an error with a descriptive message if any part of the process fails.
     */
    getRecommendedMovies: async (_, { movie }, context: Context) => {
      try {
        const potensiallMovies = await context.prisma.movie.findMany({
          where: {
            AND: [
              { isAdult: { equals: movie.isAdult } },
              { startYear: { gte: movie.startYear - 10 } },
              { startYear: { lte: movie.startYear + 10 } },
              {
                runtimeMinutes: { gte: movie.runtimeMinutes - 30 },
              },
              {
                runtimeMinutes: { lte: movie.runtimeMinutes + 30 },
              },
              { averageRating: { gte: movie.averageRating - 2.5 } },
              { averageRating: { lte: movie.averageRating + 2.5 } },
            ],
          },
          take: 2000,
        });

        const imdbIDs = potensiallMovies.map((movie) => movie.imdbID);

        const movieGenres = await context.prisma.movieGenre.findMany({
          where: { imdbID: { in: imdbIDs } },
          include: {
            Genre: true, // Include Genre model to get genreName
          },
        });

        // Combine genres for each movie into a map
        const genresMap: Record<string, string[]> = {};
        movieGenres.forEach((movieGenre) => {
          if (!genresMap[movieGenre.imdbID]) {
            genresMap[movieGenre.imdbID] = [];
          }
          genresMap[movieGenre.imdbID].push(movieGenre.Genre.genreName); // Use genreName
        });

        const moviesWithGenres = potensiallMovies.map((movie) => ({
          ...movie,
          genres: genresMap[movie.imdbID] || [],
        }));

        // Calculate the recommendations from the recommended file
        const recommended = getRecommendations(movie, moviesWithGenres, 5);

        return recommended;
      } catch (error) {
        throw new Error(`Error in movieStats resolver: ${error.message}`);
      }
    },
  },
};

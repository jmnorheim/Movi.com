import {
  MoviesData,
  Resolvers,
  SortType,
} from "../../generated/resolvers-types";
import { Context } from "../../src";

export const movieResolver: Resolvers = {
  Query: {
    /**
     * Fetches a single movie by its IMDb ID.
     *
     * @param {object} _ - The root object, which remains unused
     * @param {object} args - The arguments passed to the query from frontend.
     * @param {string} args.imdbID - The IMDb ID of the movie.
     * @param {Context} context - The context object which gives access to Prisma.
     * @returns {Promise<object>} An object representing the movie, or an error if something goes wrong.
     */
    movie: async (_, args, context: Context) => {
      try {
        const movie = await context.prisma.movie.findUnique({
          where: { imdbID: args.imdbID },
        });
        const genres = await context.prisma.movieGenre.findMany({
          where: { imdbID: args.imdbID },
          select: {
            Genre: true,
          },
        });

        if (!movie) {
          throw new Error(`Movie with imdbID ${args.imdbID} not found`);
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
     * @param {object} args - The arguments passed to the query from frontend.
     * @param {number} args.offset - The number of records (movies) to skip for pagination.
     * @param {number} args.limit - The maximum number of records (movies) to return.
     * @param {string} args.searchBy - A search string to filter movies by primaryTitle, originalTitle or imdbID.
     * @param {object} args.filter - Various filters to apply, contains isAdult, releaseYearRange, runtimeMinutesRange, averageRatingRange, totalVotesRange and genres.
     * @param {Context} context - The context object which gives access to Prisma.
     * @returns {Promise<Array<MoviesData>>} An array of objects representing the list of movies, or an error if something goes wrong.
     */
    movies: async (_, args, context: Context) => {
      let orderBy;

      // Determine the sorting order based on the sortBy argument
      if (args.sortBy) {
      }
      switch (args.sortBy) {
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
          { isAdult: { equals: args.filter?.isAdult } },
          { startYear: { gte: args.filter?.releaseYearRange?.min } },
          { startYear: { lte: args.filter?.releaseYearRange?.max } },
          {
            runtimeMinutes: { gte: args.filter?.runtimeMinutesRange?.min },
          },
          {
            runtimeMinutes: { lte: args.filter?.runtimeMinutesRange?.max },
          },
          { averageRating: { gte: args.filter?.averageRatingRange?.min } },
          { averageRating: { lte: args.filter?.averageRatingRange?.max } },
          { totalVotes: { gte: args.filter?.totalVotesRange?.min } },
          { totalVotes: { lte: args.filter?.totalVotesRange?.max } },
          {
            OR: [
              { imdbID: { contains: args.searchBy } },
              { primaryTitle: { contains: args.searchBy } },
              { originalTitle: { contains: args.searchBy } },
            ],
          },
        ],
      };

      try {
        const movies = await context.prisma.movie.findMany({
          where: whereConditions,
          orderBy: orderBy,
          skip: args.offset ? args.offset : 0,
          take: args.limit ? args.limit : 10,
        });

        const totalMovies = await context.prisma.movie.count({
          where: whereConditions,
        });

        // Step 2: Get the imdbIDs of all fetched movies
        const imdbIDs = movies.map((movie) => movie.imdbID);

        // Step 3: Fetch all the movie-genre relations for these movies
        const movieGenres = await context.prisma.movieGenre.findMany({
          where: { imdbID: { in: imdbIDs } },
          include: {
            Genre: true, // Include Genre model to get genreName
          },
        });

        // Step 4: Create a map (dictionary) to associate imdbID with its genres
        const genresMap: Record<string, string[]> = {};
        movieGenres.forEach((movieGenre) => {
          if (!genresMap[movieGenre.imdbID]) {
            genresMap[movieGenre.imdbID] = [];
          }
          genresMap[movieGenre.imdbID].push(movieGenre.Genre.genreName); // Use genreName
        });

        // Step 5: Add the genres to each movie
        const moviesWithGenres = movies.map((movie) => ({
          ...movie,
          genres: genresMap[movie.imdbID] || [],
        }));

        if (args.filter?.genres?.length > 0) {
          // If a genre-filter is applied
          // Step 6: Filter out movies that don't have any of the required genres
          const filteredMovies = moviesWithGenres.filter((movie) => {
            return movie.genres.some((genre) =>
              args.filter.genres.includes(genre)
            );
          });
          const moviesData: MoviesData = {
            movies: filteredMovies,
            count: totalMovies,
          };
          return moviesData;
        }
        const moviesData: MoviesData = {
          movies: moviesWithGenres,
          count: totalMovies,
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
  },
};

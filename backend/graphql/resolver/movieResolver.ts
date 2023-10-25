import { Resolvers } from "../../generated/resolvers-types";
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
                        imdbID: true,
                    }
                });

                if (!movie) {
                    throw new Error(`Movie with imdbID ${args.imdbID} not found`);
                }

                const movieWithGenres = {
                    ...movie,
                    genres: genres.map((genre) => genre.imdbID),
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
         * @returns {Promise<Array<object>>} An array of objects representing the list of movies, or an error if something goes wrong.
         */
        movies: async (_, args, context: Context) => {

            try {
                const movies = await context.prisma.movie.findMany({
                    skip: args.offset,
                    take: args.limit,
                    where: {
                        AND: [
                            { isAdult: { equals: args.filter?.isAdult } },
                            { startYear: { gte: args.filter?.releaseYearRange?.min } },
                            { startYear: { lte: args.filter?.releaseYearRange?.max } },
                            { runtimeMinutes: { gte: args.filter?.runtimeMinutesRange?.min } },
                            { runtimeMinutes: { lte: args.filter?.runtimeMinutesRange?.max } },
                            { averageRating: { gte: args.filter?.averageRatingRange?.min } },
                            { averageRating: { lte: args.filter?.averageRatingRange?.max } },
                            { totalVotes: { gte: args.filter?.totalVotesRange?.min } },
                            { totalVotes: { lte: args.filter?.totalVotesRange?.max } },
                            {
                                OR: [
                                    { imdbID: { contains: args.searchBy } },
                                    { primaryTitle: { contains: args.searchBy } },
                                    { originalTitle: { contains: args.searchBy } }
                                ]
                            },
                        ],

                    },
                });

                // Step 2: Get the imdbIDs of all fetched movies
                const imdbIDs = movies.map(movie => movie.imdbID);

                // Step 3: Fetch all the movie-genre relations for these movies
                const movieGenres = await context.prisma.movieGenre.findMany({
                    where: { imdbID: { in: imdbIDs } },
                    include: {
                        Genre: true // Include Genre model to get genreName
                    }
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

                if (args.filter?.genres?.length > 0) { // If a genre-filter is applied
                    // Step 6: Filter out movies that don't have any of the required genres
                    const filteredMovies = moviesWithGenres.filter((movie) => {
                        return movie.genres.some(genre => args.filter.genres.includes(genre));
                    });
                    return filteredMovies;
                }
                return moviesWithGenres;

            } catch (error) {
                throw new Error(`Error: ${error.message}`);
            }
        }
    }
};
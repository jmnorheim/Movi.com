import { Resolvers } from "../../generated/resolvers-types";
import { Context } from "../../src";

export const movieResolver: Resolvers = {
    Query: {

        movie: async (_, args, context: Context) => {
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
        },

        // Args består av offset, limit, searchBy og filter
        movies: async (_, args, context: Context) => {
            

            const movies = await context.prisma.movie.findMany({
                skip: args.offset,
                take: args.limit,
                where : { 
                    AND: [
                        { isAdult: { equals: args.filter?.isAdult } },
                        { startYear: { gte: args.filter?.releaseYearRange?.min } },
                        { startYear: { lte: args.filter?.releaseYearRange?.max }} ,
                        { runtimeMinutes: { gte: args.filter?.runtimeMinutesRange?.min } },
                        { runtimeMinutes: { lte: args.filter?.runtimeMinutesRange?.max } },
                        { averageRating: { gte: args.filter?.averageRatingRange?.min } },
                        { averageRating: { lte: args.filter?.averageRatingRange?.max } },
                        { totalVotes: { gte: args.filter?.totalVotesRange?.min } },
                        { totalVotes: { lte: args.filter?.totalVotesRange?.max } },
                        {OR: [
                            { imdbID: { contains: args.searchBy } },
                            { primaryTitle: { contains: args.searchBy } },
                            { originalTitle: { contains: args.searchBy } }
                        ]},
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

            // Step 4: Create a map to associate imdbID with its genres
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
                // Step 6: Filter out movies that don't have any of the required genres
                const filteredMovies = moviesWithGenres.filter((movie) => {
                    return movie.genres.some(genre => args.filter.genres.includes(genre));
                });

                return filteredMovies;
            }
            return moviesWithGenres;
            },
    },
  };
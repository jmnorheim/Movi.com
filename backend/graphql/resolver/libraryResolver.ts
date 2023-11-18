import { Movie, Resolvers } from "../../generated/resolvers-types";
import { Context } from "../../src";

// Helper functions=========================================================================================================

/**
 * Retrieves the IMDb IDs of movies in a specific library.
 * @function
 * @async
 * @param {string} libraryID - The unique identifier of the library.
 * @param {Context} context - The context object containing the Prisma client.
 * @returns {Promise<string[]>} A promise resolving to an array of IMDb IDs.
 */
const getMoviesInLibrary = async (
  libraryID: string,
  context: Context
): Promise<string[]> => {
  const moviesInLibrary = await context.prisma.libraryMovie
    .findMany({
      where: { libraryID: libraryID },
      select: { imdbID: true },
    })
    .then((movies) => movies.map((movie) => movie.imdbID));

  return moviesInLibrary;
};

const getLibrariesByID = async (libraryID: string, context: Context) => {
  const libraryPrisma = await context.prisma.library.findUnique({
    where: { libraryID: libraryID },
  });

  const moviesInLibrary = await getMoviesInLibrary(libraryID, context);

  const library = {
    ...libraryPrisma,
    movies: moviesInLibrary,
  };

  return library;
};

// Define a type for the shape of each library movie
type LibraryMovie = { imdbID: string };

/**
 * Fetches detailed information about movies, including their genres.
 * @param {LibraryMovie[]} libraryMovies - An array of objects containing IMDb IDs.
 * @param {Context} context - The context object containing the Prisma client.
 * @returns {Promise<Movie[]>} - A promise that resolves to an array of Movie objects with genre information.
 */
const getListOfAllMovies = async (
  libraryMovies: LibraryMovie[],
  context: Context
): Promise<Movie[]> => {
  // Step 1: Extracting IMDb IDs for genre and movie fetching
  const imdbIDs = libraryMovies.map((libMovie) => libMovie.imdbID);

  // Step 2: Fetch all movies with their full details
  const movies = await context.prisma.movie.findMany({
    where: { imdbID: { in: imdbIDs } },
  });

  // Step 3: Fetch all the movie-genre relations for these movies
  const movieGenres = await context.prisma.movieGenre.findMany({
    where: { imdbID: { in: imdbIDs } },
    include: {
      Genre: true,
    },
  });

  // Step 4: Create a map to associate IMDb IDs with their genres
  const genresMap: Record<string, string[]> = {};
  movieGenres.forEach((movieGenre) => {
    if (!genresMap[movieGenre.imdbID]) {
      genresMap[movieGenre.imdbID] = [];
    }
    genresMap[movieGenre.imdbID].push(movieGenre.Genre.genreName); // Use genreName
  });

  // Step 5: Combine the movies with their genres
  const moviesWithGenres = movies.map((movie) => ({
    ...movie,
    genres: genresMap[movie.imdbID] || [],
  }));

  return moviesWithGenres;
};

const getListOfAllMoviesInLibrary = async (
  libraryID: string,
  context: Context
): Promise<Movie[]> => {
  // Step 1: Fetch all movies in the library with their IMDb IDs
  const libraryMovies = await context.prisma.libraryMovie.findMany({
    where: { libraryID },
    select: { imdbID: true },
  });

  // Step 2: Return list of movies
  return getListOfAllMovies(libraryMovies, context);
};

const getListOfAllMoviesInFavorites = async (
  context: Context
): Promise<Movie[]> => {
  // Step 1: Fetch all movies in the library with their IMDb IDs
  const libraryMovies = await context.prisma.userFavorites.findMany({
    select: { imdbID: true },
  });

  return getListOfAllMovies(libraryMovies, context);
};

// Resolvers=========================================================================================================
export const libraryResolver: Resolvers = {
  // Queries=========================================================================================================
  Query: {
    /**
     * Retrieves a library by its unique identifier.
     * @function
     * @async
     * @param {object} _ - The parent object, which is not used in this resolver.
     * @param {string} libraryID - The unique identifier of the library.
     * @param {Context} context - The context object containing the Prisma client.
     * @returns {Promise<Library>} A promise resolving to the library object.
     */
    libraryByID: async (_, { libraryID }, context: Context) => {
      try {
        return getLibrariesByID(libraryID, context);
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Fetch a list of movies in a unique library.
     */
    moviesByLibraryID: async (_, { libraryID }, context: Context) => {
      try {
        if (libraryID === "favorites") {
          return getListOfAllMoviesInFavorites(context);
        }
        return getListOfAllMoviesInLibrary(libraryID, context);
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Retrieves a list of libraries associated with a specific user.
     *
     * @function
     * @async
     * @param {Object} _ - Placeholder parameter for the root object, not used in this function.
     * @param {string} userID - The unique identifier of the user.
     * @param {number} limit - The maximum number of libraries to retrieve. Optional.
     * @param {number} offset - The number of libraries to skip before starting to retrieve. Optional.
     * @param {Context} context - The context object containing the Prisma client and other utilities.
     * @returns {Promise<Array<Library>>} A promise that resolves to an array of library objects, each containing a list of movies.
     * @throws {Error} Throws an error if the retrieval fails.
     * @description This function retrieves a paginated list of libraries associated with a specific user from the database using Prisma,
     * and for each library, it retrieves the associated movies. The results are then returned as an array of library objects.
     */
    librariesByUserID: async (
      _,
      { userID, limit, offset },
      context: Context
    ) => {
      try {
        const librariesPrisma = await context.prisma.library.findMany({
          where: { userID: userID },
          take: limit,
          skip: offset,
        });

        const libraries = await Promise.all(
          librariesPrisma.map(async (library) => {
            const moviesInLibrary = await getMoviesInLibrary(
              library.libraryID,
              context
            );

            return {
              ...library,
              movies: moviesInLibrary,
            };
          })
        );

        return libraries;
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Retrieves a library by the user's identifier and the library's name.
     * @function
     * @async
     * @param {object} _ - The parent object, which is not used in this resolver.
     * @param {string} userID - The unique identifier of the user.
     * @param {string} name - The name of the library.
     * @param {Context} context - The context object containing the Prisma client.
     * @returns {Promise<Library>} A promise resolving to the library object.
     */
    /*
    libraryByUserAndName: async (_, { userID, name }, context: Context) => {
      try {
        const libraryPrisma = await context.prisma.library.findUnique({
          where: {
            userID_name: {
              userID: userID,
              name: name,
            },
          },
        });

        const moviesInLibrary = await getMoviesInLibrary(
          libraryPrisma.libraryID,
          context
        );

        const library = {
          ...libraryPrisma,
          movies: moviesInLibrary,
        };

        return library;
      } catch (error) {
        throw new Error(error);
      }
    },*/

    /**
     * Retrieves a list of libraries with pagination.
     * @function
     * @async
     * @param {object} _ - The parent object, which is not used in this resolver.
     * @param {number} limit - The number of libraries to retrieve.
     * @param {number} offset - The offset for pagination.
     * @param {Context} context - The context object containing the Prisma client.
     * @returns {Promise<Library[]>} A promise resolving to an array of library objects.
     */
    libraries: async (_, { limit, offset }, context: Context) => {
      try {
        const librariesPrisma = await context.prisma.library.findMany({
          skip: offset,
          take: limit,
        });

        const libraries = await Promise.all(
          librariesPrisma.map(async (library) => {
            const moviesInLibrary = await getMoviesInLibrary(
              library.libraryID,
              context
            );

            return {
              ...library,
              movies: moviesInLibrary,
            };
          })
        );

        return libraries;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  // Mutations=====================================================================================================
  Mutation: {
    /**
     * Renames a library.
     * @function
     * @async
     * @param {object} _ - The parent object, which is not used in this resolver.
     * @param {string} libraryID - The unique identifier of the library.
     * @param {string} name - The new name of the library.
     * @param {Context} context - The context object containing the Prisma client.
     * @returns {Promise<Library>} A promise resolving to the updated library object.
     */
    renameLibrary: async (_, { libraryID, name }, context: Context) => {
      try {
        const libraryPrisma = await context.prisma.library.update({
          where: { libraryID: libraryID },
          data: { name: name },
        });

        const moviesInLibrary = await getMoviesInLibrary(libraryID, context);

        const library = {
          ...libraryPrisma,
          movies: moviesInLibrary,
        };

        return library;
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Adds a movie to a library.
     * @function
     * @async
     * @param {object} _ - The parent object, which is not used in this resolver.
     * @param {string} libraryID - The unique identifier of the library.
     * @param {string} movieID - The IMDb ID of the movie.
     * @param {Context} context - The context object containing the Prisma client.
     * @returns {Promise<Library>} A promise resolving to the updated library object.
     */
    addMovieToLibrary: async (_, { libraryID, movieID }, context: Context) => {
      try {
        const libraryMovie = await context.prisma.libraryMovie.create({
          data: {
            libraryID: libraryID,
            imdbID: movieID,
          },
        });

        return getLibrariesByID(libraryID, context);
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Removes a movie from a library.
     * @function
     * @async
     * @param {object} _ - The parent object, which is not used in this resolver.
     * @param {string} libraryID - The unique identifier of the library.
     * @param {string} movieID - The IMDb ID of the movie to be removed.
     * @param {Context} context - The context object containing the Prisma client.
     * @returns {Promise<Library>} A promise resolving to the updated library object.
     * @throws {Error} Throws an error if the operation fails.
     */
    removeMovieFromLibrary: async (
      _,
      { libraryID, movieID },
      context: Context
    ) => {
      try {
        const libraryMovie = await context.prisma.libraryMovie.delete({
          where: {
            libraryID_imdbID: {
              libraryID: libraryID,
              imdbID: movieID,
            },
          },
        });

        return getLibrariesByID(libraryID, context);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

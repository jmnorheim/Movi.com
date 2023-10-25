import { Resolvers } from "../../generated/resolvers-types";
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

const getLibrarisByID = async (libraryID: string, context: Context) => {
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

// Resolvers=========================================================================================================
export const libraryResolver: Resolvers = {
  // Queries=====================================================================================================
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
        return getLibrarisByID(libraryID, context);
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
    },

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

        return getLibrarisByID(libraryID, context);
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

        return getLibrarisByID(libraryID, context);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

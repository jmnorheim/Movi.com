import { Resolvers } from "../../generated/resolvers-types";
import { Context } from "../../src";
import { hashPassword, verifyPassword } from "../../src/encryption.js";

// Helper functions=========================================================================================================

type SimpleUser = {
  userID: string;
  username: string;
  email: string;
  password: string;
};

/**
 * Helper function.
 *
 * Fetch detailed information of a user, including libraries and favorite movies.
 *
 * @param {SimpleUser} user - The user object.
 * @param {Context} context - The Prisma context.
 * @returns {Promise<User>} - An User containing detailed user-info.
 */
const getUserDetails = async (user: SimpleUser, context: Context) => {
  // Fetch users libraries
  const libraries = await context.prisma.library.findMany({
    where: { userID: user.userID },
  });

  // Fetch movies in those libraries
  const libraryMovie = await context.prisma.libraryMovie.findMany({
    where: { libraryID: { in: libraries.map((lib) => lib.libraryID) } },
    select: { imdbID: true },
  });

  // Library data
  const library = libraries.map((lib) => ({
    ...lib,
    movies: libraryMovie.map((libmov) => libmov.imdbID),
  }));

  // Fetch users favorite movies
  const favorites = await context.prisma.userFavorites.findMany({
    where: { userID: user.userID },
    select: { imdbID: true },
  });

  return {
    ...user,
    library,
    favorites: favorites.map((fav) => fav.imdbID),
  };
};

/**
 * Helper function.
 *
 * Check if a movie is in a user's favorite list.
 *
 * @param {string} userID - The user's ID.
 * @param {string} imdbID - The movie's IMDB ID.
 * @param {Context} context - The Prisma context.
 * @returns {Promise<boolean>} - True if the movie is in the user's favorites, otherwise false.
 */
async function isMovieInFavorites(
  userID: string,
  imdbID: string,
  context: Context
): Promise<boolean> {
  const favorite = await context.prisma.userFavorites.findFirst({
    where: {
      userID: userID,
      imdbID: imdbID,
    },
  });
  // If the favorite exists, return true, else false
  return !!favorite;
}

// Resolvers=========================================================================================================

export const userResolver: Resolvers = {
  // Queries=====================================================================================================
  Query: {
    /**
     * Fetch a list of users with optional pagination.
     *
     * @param {number} limit - The maximum number of users to return.
     * @param {number} offset - The number of users to skip before starting to return results.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User[]>} - A promise that resolves to an array of user objects.
     */
    users: async (_, { limit, offset }, context: Context) => {
      const users = await context.prisma.user.findMany({
        take: limit,
        skip: offset,
      });
      const usersWithAllData = Promise.all(
        users.map((user) => getUserDetails(user, context))
      );
      return usersWithAllData;
    },

    /**
     * Fetch a user by their unique ID.
     *
     * @param {string} userID - The unique ID of the user.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User | null>} - A promise that resolves to a user object or null if not found.
     */
    userByID: async (_, { userID }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      return getUserDetails(user, context);
    },

    /**
     * Fetch a user by their email address.
     *
     * @param {string} email - The email address of the user.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User | null>} - A promise that resolves to a user object or null if not found.
     */
    userByEmail: async (_, { email }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: email },
      });
      return getUserDetails(user, context);
    },

    /**
     * Check if a movie is in the user's favorite list by userID.
     *
     * @param {string} userID - The user's ID.
     * @param {string} imdbID - The movie's IMDB ID.
     * @param {Context} context - The Prisma context.
     * @returns {Promise<boolean>} - True if the movie is in the user's favorites, otherwise false.
     */
    movieInFavoriteByUserID: async (
      _,
      { userID, imdbID },
      context: Context
    ) => {
      return isMovieInFavorites(userID, imdbID, context);
    },

    /**
     * Check if a movie is in the user's favorite list by email.
     *
     * @param {string} email - The user's email address.
     * @param {string} imdbID - The movie's IMDB ID.
     * @param {Context} context - The Prisma context.
     * @returns {Promise<boolean>} - True if the movie is in the user's favorites, otherwise false.
     */
    movieInFavoriteByUserEmail: async (
      _,
      { email, imdbID },
      context: Context
    ) => {
      const user = await context.prisma.user.findUnique({
        where: { email: email },
      });
      return isMovieInFavorites(user.userID, imdbID, context);
    },

    /**
     * Check if the password is correct for a given email.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The password to verify.
     * @param {Context} context - The Prisma context.
     * @returns {Promise<boolean>} - True if the password is correct, otherwise false.
     * @throws {Error} - If the user does not exist.
     */
    verifyPassword: async (_, { email, password }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: email },
      });
      return verifyPassword(password, user.password);
    },

    /**
     * Fetch the user's favorites.
     *
     * @param {string} userID - The unique ID of the user.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<Movie[]>} - A promise that resolves to an array of the user's favorite movies.
     */
    favorites: async (_, { userID }, context: Context) => {
      const userFavoritesWithMoviesAndGenres =
        await context.prisma.userFavorites.findMany({
          where: { userID: userID },
          include: {
            Movie: {
              include: {
                MovieGenre: {
                  select: {
                    Genre: {
                      select: {
                        genreName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

      const favorites = userFavoritesWithMoviesAndGenres.map((fav) => ({
        ...fav.Movie,
        genres: fav.Movie.MovieGenre.map((mg) => mg.Genre.genreName),
      }));

      return favorites;
    },
  },

  // Mutations=====================================================================================================
  Mutation: {
    /**
     * Create a new user.
     *
     * @param {string} username - The username of the new user.
     * @param {string} email - The email address of the new user.
     * @param {string} password - The password for the new user.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User>} - A promise that resolves to the newly created user object.
     */
    createUser: async (_, { username, email, password }, context: Context) => {
      // Hash the password before storing it
      const hashedPassword = hashPassword(password);

      const newUser = await context.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      return getUserDetails(newUser, context);
    },

    /**
     * Update a user based on userID.
     *
     * @param {string} userID - The unique ID of the user to update.
     * @param {string} username - The new username for the user.
     * @param {string} email - The new email address for the user.
     * @param {string} password - The new password for the user.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User>} - A promise that resolves to the updated user object.
     */
    updateUser: async (
      _,
      { userID, username, email, password },
      context: Context
    ) => {
      const updatedUser = await context.prisma.user.update({
        where: { userID: userID },
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      return getUserDetails(updatedUser, context);
    },

    /**
     * Delete a user based on userID.
     *
     * @param {string} userID - The unique ID of the user to delete.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User>} - A promise that resolves to the deleted user object.
     */

    deleteUser: async (_, { userID }, context: Context) => {
      const userToDelete = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      const detailedUser = await getUserDetails(userToDelete, context);
      await context.prisma.user.delete({ where: { userID: userID } });
      return detailedUser;
    },

    /**
     * Adds a movie to a user's favorites.
     *
     * @param {string} userID - The user's ID.
     * @param {string} imdbID - The movie's IMDB ID.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User>} - A promise that resolves to the user object after updating their favorites.
     */

    addMovieToFavorite: async (_, { userID, imdbID }, context: Context) => {
      await context.prisma.userFavorites.create({
        data: {
          userID: userID,
          imdbID: imdbID,
        },
      });
      const user = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      return getUserDetails(user, context);
    },

    /**
     * Removes a movie from a user's favorites.
     *
     * @param {string} userID - The user's ID.
     * @param {string} imdbID - The movie's IMDB ID to remove from favorites.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User>} - A promise that resolves to the user object after updating their favorites.
     */

    removeMovieFromFavorite: async (
      _,
      { userID, imdbID },
      context: Context
    ) => {
      await context.prisma.userFavorites.delete({
        where: {
          userID_imdbID: {
            userID: userID,
            imdbID: imdbID,
          },
        },
      });
      const user = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      return getUserDetails(user, context);
    },

    /**
     * Add a new library for the user.
     *
     * @param {string} userID - The user's ID.
     * @param {string} libraryName - The name of the new library.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User>} - A promise that resolves to the user object after adding the new library.
     */

    addLibrary: async (_, { userID, libraryName }, context: Context) => {
      await context.prisma.library.create({
        data: {
          userID: userID,
          name: libraryName,
        },
      });
      const user = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      return getUserDetails(user, context);
    },

    /**
     * Removes a library based on libraryID.
     *
     * @param {string} userID - The user's ID who owns the library.
     * @param {string} libraryID - The library ID to be removed.
     * @param {Context} context - The Prisma context for database access.
     * @returns {Promise<User>} - A promise that resolves to the user object after removing the library.
     */

    removeLibrary: async (_, { userID, libraryID }, context: Context) => {
      // First, delete all LibraryMovie records related to this library
      await context.prisma.libraryMovie.deleteMany({
        where: { libraryID: libraryID },
      });

      // Then, delete the library
      await context.prisma.library.delete({
        where: { libraryID: libraryID },
      });

      const user = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      return getUserDetails(user, context);
    },
  },
};

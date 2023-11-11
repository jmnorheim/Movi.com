import { Resolvers } from "../../generated/resolvers-types";
import { Context } from "../../src";
import { hashPassword, verifyPassword } from "../../src/encryption.js";

// Helper functions=========================================================================================================

/**
 * Helper function.
 *
 * Fetch detailed information of a user, including libraries and favorite movies.
 *
 * @param {Object} user - The user object.
 * @param {Context} context - The Prisma context.
 * @returns {Promise<Object>} - An object containing detailed user-info.
 */
const getUserDetails = async (user: any, context: Context) => {
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
  // Fetch users favorite by movie ID
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
     */
    users: async (_, { limit, offset }, context: Context) => {
      const users = await context.prisma.user.findMany({
        take: limit, // number of records to take (limit)
        skip: offset, // number of records to skip (offset)
      });
      return Promise.all(users.map((user) => getUserDetails(user, context)));
    },

    /**
     * Fetch a user by their unique ID.
     */
    userByID: async (_, { userID }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      return getUserDetails(user, context);
    },

    /**
     * Fetch a user by their email address.
     */
    userByEmail: async (_, { email }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: email },
      });
      return getUserDetails(user, context);
    },

    /**
     * Check if movie is in the user's favorite list by userID.
     */
    movieInFavoriteByUserID: async (
      _,
      { userID, imdbID },
      context: Context
    ) => {
      const user = await context.prisma.user.findUnique({
        where: { userID: userID },
      });
      return isMovieInFavorites(user.userID, imdbID, context);
    },

    /**
     * Check if movie is in the users favorite list by email.
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
    verifyPassword: async (_, { email, password }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: email },
      });
      return verifyPassword(password, user.password);
    },
  },

  // Mutations=====================================================================================================
  Mutation: {
    /**
     * Create a new user.
     */
    createUser: async (_, { username, email, password }, context: Context) => {
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
     * Adds a movie to a users favorites.
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
     * Removes a movie from a users favorites.
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
     */
    removeLibrary: async (_, { userID, libraryID }, context: Context) => {
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

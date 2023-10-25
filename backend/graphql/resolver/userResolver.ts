import { Resolvers } from "../../generated/resolvers-types";
import { Context } from "../../src";

/**
 * Fetch detailed information of a user,
 * including their libraries and favorite movies.
 */
const getUserDetails = async (user: any, context: Context) => {
    const libraries = await context.prisma.library.findMany({
        where: { userID: user.userID }
    });

    const libraryMovie = await context.prisma.libraryMovie.findMany({
        where: { libraryID: { in: libraries.map((lib) => lib.libraryID) } },
        select: { imdbID: true }
    });

    const library = libraries.map(lib => ({
        ...lib,
        movies: libraryMovie.map(libmov => libmov.imdbID)
    }));

    const favorites = await context.prisma.userFavorites.findMany({
        where: { userID: user.userID },
        select: { imdbID: true }
    });

    return {
        ...user,
        library,
        favorites: favorites.map(fav => fav.imdbID)
    };
};


export const userResolver: Resolvers = {
    Query: {
        /**
         * Fetch a list of users with optional pagination.
         */
        users: async (_, { limit, offset }, context: Context) => {
            const users = await context.prisma.user.findMany({
                take: limit,   // number of records to take (limit)
                skip: offset,  // number of records to skip (offset)
            });

            return Promise.all(users.map(user => getUserDetails(user, context)));
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
        }
    },
};

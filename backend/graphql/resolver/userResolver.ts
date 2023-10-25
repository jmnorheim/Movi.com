import { Resolvers } from "../../generated/resolvers-types";
import { Context } from "../../src";

export const userResolver: Resolvers = {
    Query: {
        userByEmail: async (_, args, context: Context) => {
            const user = await context.prisma.user.findUnique({
                where: { email: args.email },
            });

            const libraries = await context.prisma.library.findMany({
                where: { userID: user.userID }
            });

            const libraryMovie = await context.prisma.libraryMovie.findMany({
                where: {libraryID: {in: libraries.map((lib) => lib.libraryID)}},
                select: { imdbID: true }
            });

            const library =  libraries.map(lib => ({
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

        }
    },   
};
import { describe, it, expect, beforeEach, vi } from "vitest";
import { userResolver } from "../../graphql/resolver/userResolver";
import { Context } from "../../src";

/**
 * Tessts queries and mutations in userResolver.
 */
describe("userResolver", () => {
    let mockContext;

    /**
     *  Sets up mocked methods for user.
     */
    beforeEach(() => {
        mockContext = {
            prisma: {
                user: {
                    findMany: vi.fn(),
                    findUnique: vi.fn(),
                    create: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn(),
                },
                library: {
                    create: vi.fn(),
                    delete: vi.fn(),
                    findMany: vi.fn(),
                },
                libraryMovie: {
                    findMany: vi.fn(),
                },
                userFavorites: {
                    findMany: vi.fn(),
                    findFirst: vi.fn(),
                    create: vi.fn(),
                    delete: vi.fn(),
                },
            },
        };
        vi.clearAllMocks();
    });

    /**
     * Query tests.
     */
    describe("Query", () => {
        /**
         * Query: users - Fetches users with details.
         */
        it("Query: users - Fetches users with details.", async () => {
            const mockUsers = [{ userID: "1", username: "User1" }];
            mockContext.prisma.user.findMany.mockResolvedValue(mockUsers);
            mockContext.prisma.library.findMany.mockResolvedValue([]);
            mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
            mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

            const result = await userResolver.Query.users(null, { limit: 2, offset: 0 }, mockContext as unknown as Context);

            expect(mockContext.prisma.user.findMany).toHaveBeenCalled();
            expect(result).toEqual([
                expect.objectContaining({
                    userID: "1",
                    username: "User1",
                    library: [],
                    favorites: [],
                }),
            ]);
        });

        /**
         * Query: userByID - Fetches a user by their ID.
         */
        it("Query: userByID - Fetches a user by their ID.", async () => {
            const mockUser = { userID: "1", username: "User1" };
            mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
            mockContext.prisma.library.findMany.mockResolvedValue([]);
            mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
            mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

            const result = await userResolver.Query.userByID(null, { userID: "1" }, mockContext as unknown as Context);

            expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({ where: { userID: '1' } });
            expect(result).toEqual(expect.objectContaining({
                userID: "1",
                username: "User1",
                library: [],
                favorites: [],
            }));
        });

        /**
         * Query: userByEmail - Fetches a user by their email.
         */
        it("should fetch a user by their email", async () => {
            const mockUser = { email: "user1@example.com", username: "User1" };
            mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
            mockContext.prisma.library.findMany.mockResolvedValue([]);
            mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
            mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);
    
            const result = await userResolver.Query.userByEmail(null, { email: "user1@example.com" }, mockContext as unknown as Context);
    
            expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "user1@example.com" } });
            expect(result).toEqual(expect.objectContaining({
                email: "user1@example.com",
                username: "User1",
                library: [],
                favorites: [],
            }));
        });  
    
        /**
         * Query: movieInFavoriteByUserID - Checks if a movie is in a user's favorite list by userID.
         */
        it("Checks if a movie is in a user's favorite list by userID.", async () => {
            mockContext.prisma.user.findUnique.mockResolvedValue({ userID: "1", email: "user1@example.com" });
            mockContext.prisma.userFavorites.findFirst.mockResolvedValue({ userID: "1", imdbID: "movie1" });

            const result = await userResolver.Query.movieInFavoriteByUserID(null, { userID: "1", imdbID: "movie1" }, mockContext as unknown as Context);

            expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({ where: { userID: "1" } });
            expect(mockContext.prisma.userFavorites.findFirst).toHaveBeenCalledWith({
                where: { userID: "1", imdbID: "movie1" }
            });
            expect(result).toBe(true);
        });

        /**
        * Query: movieInFavoriteByUserEmail - Checks if a movie is in a user's favorite list by email.
        */
        it("Query: movieInFavoriteByUserEmail - Checks if a movie is in a user's favorite list by email.", async () => {
            mockContext.prisma.user.findUnique.mockResolvedValue({ userID: "1", email: "user1@example.com" });
            mockContext.prisma.userFavorites.findFirst.mockResolvedValue({ userID: "1", imdbID: "movie1" });
    
            const result = await userResolver.Query.movieInFavoriteByUserEmail(null, { email: "user1@example.com", imdbID: "movie1" }, mockContext as unknown as Context);
    
            expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "user1@example.com" } });
            expect(mockContext.prisma.userFavorites.findFirst).toHaveBeenCalledWith({
                where: { userID: "1", imdbID: "movie1" }
            });
            expect(result).toBe(true);
        });
    });
});
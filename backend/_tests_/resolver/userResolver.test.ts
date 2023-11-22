import { describe, it, expect, beforeEach, vi } from "vitest";
import { userResolver } from "../../graphql/resolver/userResolver";
import { Context } from "../../src";

/**
 * Tests queries and mutations in userResolver.
 */
describe("userResolver", () => {
  let mockContext;

  /**
   *  Sets up mocked methods for user.
   */
  beforeEach(() => {
    mockContext = setupMockContext();
    vi.clearAllMocks();
  });

  /**
   * Querys
   */
  describe("Query", () => {
    /**
     * Query: users - Fetches users.
     */
    it("Query: users - Fetches users.", async () => {
      const mockUsers = [{ userID: "1", username: "User1" }];
      mockContext.prisma.user.findMany.mockResolvedValue(mockUsers);
      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Query.users(
        null,
        { limit: 2, offset: 0 },
        mockContext as unknown as Context
      );

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

      const result = await userResolver.Query.userByID(
        null,
        { userID: "1" },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { userID: "1" },
      });
      expect(result).toEqual(
        expect.objectContaining({
          userID: "1",
          username: "User1",
          library: [],
          favorites: [],
        })
      );
    });

    /**
     * Query: userByEmail - Fetches a user by their email.
     */
    it("Query: userByEmail - should fetch a user by their email", async () => {
      const mockUser = { email: "user1@example.com", username: "User1" };
      mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Query.userByEmail(
        null,
        { email: "user1@example.com" },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "user1@example.com" },
      });
      expect(result).toEqual(
        expect.objectContaining({
          email: "user1@example.com",
          username: "User1",
          library: [],
          favorites: [],
        })
      );
    });

    /**
     * Query: movieInFavoriteByUserID - Checks if a movie is in a user's favorite list by userID.
     */
    it("Query: movieInFavoriteByUserID - Checks if a movie is in a user's favorite list by userID.", async () => {
      mockContext.prisma.user.findUnique.mockResolvedValue({
        userID: "1",
        email: "user1@example.com",
      });
      mockContext.prisma.userFavorites.findFirst.mockResolvedValue({
        userID: "1",
        imdbID: "movie1",
      });

      const result = await userResolver.Query.movieInFavoriteByUserID(
        null,
        { userID: "1", imdbID: "movie1" },
        mockContext as unknown as Context
      );

      // expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
      //   where: { userID: "1" },
      // });
      expect(mockContext.prisma.userFavorites.findFirst).toHaveBeenCalledWith({
        where: { userID: "1", imdbID: "movie1" },
      });
      expect(result).toBe(true);
    });

    /**
     * Query: movieInFavoriteByUserEmail - Checks if a movie is in a user's favorite list by email.
     */
    it("Query: movieInFavoriteByUserEmail - Checks if a movie is in a user's favorite list by email.", async () => {
      mockContext.prisma.user.findUnique.mockResolvedValue({
        userID: "1",
        email: "user1@example.com",
      });
      mockContext.prisma.userFavorites.findFirst.mockResolvedValue({
        userID: "1",
        imdbID: "movie1",
      });

      const result = await userResolver.Query.movieInFavoriteByUserEmail(
        null,
        { email: "user1@example.com", imdbID: "movie1" },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "user1@example.com" },
      });
      expect(mockContext.prisma.userFavorites.findFirst).toHaveBeenCalledWith({
        where: { userID: "1", imdbID: "movie1" },
      });
      expect(result).toBe(true);
    });
  });

  /**
   * Mutation tests
   */
  describe("Mutations", () => {
    /**
     * Mutation: createUser - Should create a new user.
     */
    it("Mutation: createUser - Should create a new user.", async () => {
      const newUser = {
        username: "NewUser",
        email: "newuser@example.com",
        password: "Password",
      };
      mockContext.prisma.user.create.mockResolvedValue(newUser);

      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.createUser(
        null,
        newUser,
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: "NewUser",
          email: "newuser@example.com",
          password: expect.any(String),
        },
      });

      expect(result).toEqual(
        expect.objectContaining({
          username: "NewUser",
          email: "newuser@example.com",
          library: [],
          favorites: [],
        })
      );
    });

    /**
     * Mutation: updateUser - Should update a user.
     */
    it("Mutation: updateUser - Should update a user", async () => {
      const updatedUserData = {
        username: "UpdatedUser",
        email: "updatedUser@example.com",
        password: "newPassword",
      };
      const updatedUser = { userID: "1", ...updatedUserData };
      mockContext.prisma.user.update.mockResolvedValue(updatedUser);
      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.updateUser(
        null,
        { userID: "1", ...updatedUserData },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.user.update).toHaveBeenCalledWith({
        where: { userID: "1" },
        data: updatedUserData,
      });
      expect(result).toEqual(
        expect.objectContaining({
          userID: "1",
          username: "UpdatedUser",
          email: "updatedUser@example.com",
          library: [],
          favorites: [],
        })
      );
    });

    /**
     * Mutation: deleteUser - Should delete a user.
     */
    it("Mutation: deleteUser - Should delete a user", async () => {
      const userToDelete = { userID: "1", username: "User1" };
      mockContext.prisma.user.findUnique.mockResolvedValue(userToDelete);
      mockContext.prisma.user.delete.mockResolvedValue(userToDelete);

      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.deleteUser(
        null,
        { userID: "1" },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { userID: "1" },
      });
      expect(mockContext.prisma.user.delete).toHaveBeenCalledWith({
        where: { userID: "1" },
      });
      expect(result).toEqual(expect.objectContaining(userToDelete));
    });

    /**
     * Mutation: addMovieToFavorite - Should add a movie to a user's favorite.
     */
    it("Mutation: addMovieToFavorite - Should add a movie to a user's favorites", async () => {
      const userID = "1";
      const imdbID = "movie1";
      const mockUser = {
        userID,
        username: "User1",
        email: "user1@example.com",
      };

      mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
      mockContext.prisma.userFavorites.create.mockResolvedValue({
        userID,
        imdbID,
      });
      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.addMovieToFavorite(
        null,
        { userID, imdbID },
        mockContext as unknown as Context
      );

      expect(result).toEqual(
        expect.objectContaining({
          userID,
          email: "user1@example.com",
        })
      );
    });

    /**
     * Mutation: removeMovieFromFavorite - Should add a movie to a user's favorite.
     */
    it("Mutation: removeMovieFromFavorite - Should remove a movie from a user's favorites", async () => {
      const userID = "1";
      const imdbID = "movie1";
      const mockUser = {
        userID,
        username: "User1",
        email: "user1@example.com",
      };

      mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
      mockContext.prisma.userFavorites.delete.mockResolvedValue({
        userID,
        imdbID,
      });
      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.removeMovieFromFavorite(
        null,
        { userID, imdbID },
        mockContext as unknown as Context
      );

      expect(result).toEqual(
        expect.objectContaining({
          userID,
          email: "user1@example.com",
        })
      );
    });

    /**
     * Mutation: addLibrary - Should add a new library for the user.
     */
    it("Mutation: addLibrary - Should add a new library for the user", async () => {
      const userID = "1";
      const libraryName = "New Library";
      const mockUser = {
        userID,
        username: "User1",
        email: "user1@example.com",
      };

      mockContext.prisma.library.create.mockResolvedValue({
        userID,
        name: libraryName,
      });
      mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);
      mockContext.prisma.library.findMany.mockResolvedValue([
        { userID, name: libraryName },
      ]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.addLibrary(
        null,
        { userID, libraryName },
        mockContext as unknown as Context
      );

      expect(result).toEqual(
        expect.objectContaining({
          userID,
          email: "user1@example.com",
          library: expect.arrayContaining([
            expect.objectContaining({
              name: libraryName,
              userID: expect.any(String),
              movies: expect.any(Array),
            }),
          ]),
          favorites: expect.any(Array),
        })
      );
    });

    /**
     * Mutation: addLibrary - Should remove a library based on libraryID.
     */
    it("Mutation: addLibrary - Should remove a library based on libraryID", async () => {
      const userID = "1";
      const libraryID = "lib1";
      const mockUser = {
        userID,
        username: "User1",
        email: "user1@example.com",
      };

      mockContext.prisma.library.delete.mockResolvedValue({ libraryID });
      mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);

      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.removeLibrary(
        null,
        { userID, libraryID },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.library.delete).toHaveBeenCalledWith({
        where: { libraryID },
      });
      expect(result).toEqual(
        expect.objectContaining({
          userID,
          email: "user1@example.com",
          library: [],
          favorites: [],
        })
      );
    });

    /**
     * Mutation: removeLibrary - Should remove a library based on libraryID.
     */
    it("Mutation: removeLibrary - Should remove a library based on libraryID", async () => {
      const userID = "1";
      const libraryID = "lib1";
      const mockUser = {
        userID,
        username: "User1",
        email: "user1@example.com",
      };

      mockContext.prisma.library.delete.mockResolvedValue({ libraryID });
      mockContext.prisma.user.findUnique.mockResolvedValue(mockUser);

      mockContext.prisma.library.findMany.mockResolvedValue([]);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]);
      mockContext.prisma.userFavorites.findMany.mockResolvedValue([]);

      const result = await userResolver.Mutation.removeLibrary(
        null,
        { userID, libraryID },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.library.delete).toHaveBeenCalledWith({
        where: { libraryID },
      });
      expect(result).toEqual(
        expect.objectContaining({
          userID,
          email: "user1@example.com",
          library: [],
          favorites: [],
        })
      );
    });
  });
});

// Helper functions ===============================================================

/**
 *  Sets up mocked methods for user.
 */
const setupMockContext = () => {
  return {
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
};

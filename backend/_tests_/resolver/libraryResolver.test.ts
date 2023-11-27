import { describe, it, expect, beforeEach, vi } from "vitest";
import { libraryResolver } from "../../graphql/resolver/libraryResolver";
import { Context } from "../../src";

/**
 * Tests queries and mutations in libraryResolver.
 */
describe("libraryResolver", () => {
  let mockContext;

  /**
   *  Sets up mocked methods for library.
   */
  beforeEach(() => {
    mockContext = setupMockLibraryContext();
    vi.clearAllMocks();
  });

  /**
   * Querys
   */
  describe("Query", () => {
    /**
     * Query: libraryByID - Fetches a library by its ID.
     */
    it("Query: libraryByID - Fetches a library by its ID.", async () => {
      const mockLibrary = { libraryID: "lib123", name: "Test Library" };
      mockContext.prisma.library.findUnique.mockResolvedValue(mockLibrary);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]); // Mock empty movies array

      const result = await libraryResolver.Query.libraryByID(
        null,
        { libraryID: "lib123" },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.library.findUnique).toHaveBeenCalledWith({
        where: { libraryID: "lib123" },
      });
      expect(result).toEqual({ ...mockLibrary, movies: [] });
    });

    /**
     * Query: moviesByLibraryID - Fetches movies by library ID.
     */
    it("Query: moviesByLibraryID - Fetches movies by library ID.", async () => {
      const libraryID = "lib123";
      const mockMovies = [{ imdbID: "movie1" }, { imdbID: "movie2" }];
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue(mockMovies);
      mockContext.prisma.movie.findMany.mockResolvedValue(mockMovies); // Mock movie data
      mockContext.prisma.movieGenre.findMany.mockResolvedValue([]); // Mock genre data

      const result = await libraryResolver.Query.moviesByLibraryID(
        null,
        { libraryID },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.libraryMovie.findMany).toHaveBeenCalledWith({
        where: { libraryID },
        select: { imdbID: true },
      });
    });

    /**
     * Query: librariesByUserID - Fetches libraries by user ID.
     */
    it("Query: librariesByUserID - Fetches libraries by user ID.", async () => {
      const userID = "user123";
      const mockLibraries = [
        { libraryID: "lib1", name: "Library 1", userID },
        { libraryID: "lib2", name: "Library 2", userID },
      ];
      mockContext.prisma.library.findMany.mockResolvedValue(mockLibraries);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]); // Mock empty movie array

      const result = await libraryResolver.Query.librariesByUserID(
        null,
        { userID, limit: 10, offset: 0 },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.library.findMany).toHaveBeenCalledWith({
        where: { userID: userID },
        take: 10,
        skip: 0,
      });
    });

    /**
     * Query: libraryByUserAndName - Fetches a library by user and name.
     */
    it("Query: libraryByUserAndName - Fetches a library by user and name.", async () => {
      const userID = "user123";
      const name = "My Library";
      const mockLibrary = { libraryID: "lib123", name, userID };
      mockContext.prisma.library.findFirst.mockResolvedValue(mockLibrary);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]); // Mock empty movies array

      const result = await libraryResolver.Query.libraryByUserAndName(
        null,
        { userID, name },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.library.findFirst).toHaveBeenCalledWith({
        where: { userID, name },
      });
      expect(result).toEqual({ ...mockLibrary, movies: [] });
    });

    /**
     * Query: libraries - Fetches a list of libraries with pagination.
     */
    it("Query: libraries - Fetches a list of libraries with pagination.", async () => {
      const mockLibraries = [
        { libraryID: "lib1", name: "Library 1" },
        { libraryID: "lib2", name: "Library 2" },
      ];
      mockContext.prisma.library.findMany.mockResolvedValue(mockLibraries);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]); // Mock empty movie array

      const result = await libraryResolver.Query.libraries(
        null,
        { limit: 2, offset: 1 },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.library.findMany).toHaveBeenCalledWith({
        skip: 1,
        take: 2,
      });
      expect(result).toEqual(
        mockLibraries.map((lib) => ({ ...lib, movies: [] }))
      );
    });
  });

  /**
   * Mutation tests
   */
  describe("Mutations", () => {
    /**
     * Mutation: renameLibrary - Renames a library.
     */
    it("renameLibrary - Renames a library.", async () => {
      const libraryID = "lib123";
      const newName = "New Library Name";
      const mockLibrary = { libraryID: libraryID, name: newName };
      mockContext.prisma.library.update.mockResolvedValue(mockLibrary);
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]); // Mock movies

      const result = await libraryResolver.Mutation.renameLibrary(
        null,
        { libraryID, name: newName },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.library.update).toHaveBeenCalledWith({
        where: { libraryID: libraryID },
        data: { name: newName },
      });
    });

    /**
     * Mutation: addMovieToLibrary - Adds a movie to a library.
     */
    it("Mutation: addMovieToLibrary - Adds a movie to a library.", async () => {
      const libraryID = "lib123";
      const movieID = "movie123";
      mockContext.prisma.libraryMovie.create.mockResolvedValue({
        libraryID,
        imdbID: movieID,
      });
      mockContext.prisma.library.findUnique.mockResolvedValue({
        libraryID,
        name: "Test Library",
      });
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([
        { imdbID: movieID },
      ]);

      const result = await libraryResolver.Mutation.addMovieToLibrary(
        null,
        { libraryID, movieID },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.libraryMovie.create).toHaveBeenCalledWith({
        data: { libraryID: libraryID, imdbID: movieID },
      });
    });

    /**
     * Mutation: removeMovieFromLibrary - Removes a movie from a library.
     */
    it("Mutation: removeMovieFromLibrary - Removes a movie from a library.", async () => {
      const libraryID = "lib123";
      const movieID = "movie123";
      mockContext.prisma.libraryMovie.delete.mockResolvedValue({
        libraryID,
        imdbID: movieID,
      });
      mockContext.prisma.library.findUnique.mockResolvedValue({
        libraryID,
        name: "Test Library",
      });
      mockContext.prisma.libraryMovie.findMany.mockResolvedValue([]); // Mock empty movie array after deletion

      const result = await libraryResolver.Mutation.removeMovieFromLibrary(
        null,
        { libraryID, movieID },
        mockContext as unknown as Context
      );

      expect(mockContext.prisma.libraryMovie.delete).toHaveBeenCalledWith({
        where: { libraryID_imdbID: { libraryID: libraryID, imdbID: movieID } },
      });
    });
  });
});

// Helper functions ===============================================================

/**
 *  Sets up mocked methods for library.
 */
const setupMockLibraryContext = () => {
  return {
    prisma: {
      library: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        findFirst: vi.fn(),
        update: vi.fn(),
      },
      libraryMovie: {
        findMany: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
      },
      movie: {
        findMany: vi.fn(),
      },
      movieGenre: {
        findMany: vi.fn(),
      },
    },
  };
};

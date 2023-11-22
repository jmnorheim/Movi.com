import request from "graphql-request";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { MovieContent, MovieStats, MovieData, SERVER_URL } from "../interfaces";
import { MovieFilter, SortType } from "../generated/graphql";
import { graphql } from "../generated";

const GET_MOVIE = graphql(`
  query GetUser($imdbId: ID!) {
    movie(imdbID: $imdbId) {
      averageRating
      genres
      imdbID
      isAdult
      originalTitle
      poster
      primaryTitle
      runtimeMinutes
      startYear
      totalVotes
    }
  }
`);

const GET_MOVIES = graphql(`
  query GetMovies(
    $limit: Int
    $offset: Int
    $searchBy: String
    $filter: MovieFilter
    $sortBy: SortType
  ) {
    movies(
      limit: $limit
      offset: $offset
      searchBy: $searchBy
      filter: $filter
      sortBy: $sortBy
    ) {
      count
      genres
      movies {
        primaryTitle
        totalVotes
        imdbID
        startYear
        runtimeMinutes
        poster
        originalTitle
        isAdult
        averageRating
        genres
      }
    }
  }
`);

const GET_MOVIE_STATS = graphql(`
  query GetMovieStats {
    movieStats {
      averageRatingRange {
        max
        min
      }
      releaseYearRange {
        max
        min
      }
      runtimeMinutesRange {
        max
        min
      }
      totalVotesRange {
        max
        min
      }
    }
  }
`);

/**
 * Fetches detailed information about a movie using its IMDb ID.
 *
 * @param {string} imdbId - The IMDb ID of the movie.
 * @returns {Promise<MovieContent>} A promise that resolves to the detailed content of the movie.
 */
const getMovie = async (imdbId: string): Promise<MovieContent> => {
  const { movie } = await request(SERVER_URL, GET_MOVIE, {
    imdbId: imdbId,
  });

  return movie as MovieContent;
};

/**
 * Fetches a paginated list of movies based on various parameters.
 *
 * @param {number} [limit] - The maximum number of movies to return.
 * @param {number} [offset] - The number of movies to skip (used for pagination).
 * @param {string} [searchBy] - A search string to filter movies.
 * @param {MovieFilter} [filter] - Various filters to apply to the movie query.
 * @param {SortType} [sortBy] - The criterion for sorting the movies.
 * @returns {Promise<MovieData>} A promise that resolves to the data of movies, including count and genres.
 */
const getMovies = async (
  limit?: number,
  offset?: number,
  searchBy?: string,
  filter?: MovieFilter,
  sortBy?: SortType
): Promise<MovieData> => {
  const parameters = {
    limit,
    offset,
    searchBy: searchBy ?? "",
    filter: filter ?? {},
    sortBy,
  };
  const { movies } = await request(SERVER_URL, GET_MOVIES, parameters);

  return movies as MovieData;
};

/**
 * Fetches statistical data for movies, such as rating and release year ranges.
 *
 * @returns {Promise<MovieStats>} A promise that resolves to the statistical data of movies.
 */
const getMovieStats = async () => {
  const { movieStats } = await request(SERVER_URL, GET_MOVIE_STATS);

  return movieStats as MovieStats;
};

/**
 * Custom React Query hook for fetching a single movie by IMDb ID.
 *
 * @param {string | undefined} imdbId - The IMDb ID of the movie.
 * @returns The query object returned by useQuery, containing the movie's data and query state.
 */
export const useMovie = (imdbId: string | undefined) => {
  return useQuery({
    queryKey: ["Movie: " + imdbId],
    queryFn: () => getMovie(imdbId!),
    enabled: !!imdbId,
  });
};

/**
 * Custom React Query hook for fetching a paginated list of movies.
 *
 * @param {number} [page=0] - The current page number for pagination.
 * @param {number} [limit=10] - The number of movies to fetch per page.
 * @param {string} [searchBy] - A search string to filter movies.
 * @param {MovieFilter} [filter] - Filters to apply to the movie query.
 * @param {SortType} [sortBy] - The sorting criterion for the movies.
 * @returns The query object returned by useQuery, containing the list of movies and query state.
 */
export const useMovies = (
  page: number = 0,
  limit: number = 10,
  searchBy?: string,
  filter?: MovieFilter,
  sortBy?: SortType
) => {
  const offset = page * limit;
  return useQuery({
    queryKey: ["Movies: " + page, limit, searchBy, filter, sortBy],
    queryFn: () => getMovies(limit, offset, searchBy, filter, sortBy),
    keepPreviousData: true,
  });
};

/**
 * Custom React Query hook for fetching statistical data of movies.
 *
 * @returns The query object returned by useQuery, containing movie statistical data and query state.
 */
export const useMovieStats = () => {
  return useQuery({
    queryKey: ["MovieStats"],
    queryFn: () => getMovieStats(),
  });
};

/**
 * Pre-fetches movies for the next page to optimize data loading.
 *
 * @param {QueryClient} client - The QueryClient instance used for managing queries.
 * @param {number} [page=0] - The current page number.
 * @param {number} [limit=10] - The number of movies to fetch per page.
 * @param {string} [searchBy] - A search string to filter movies.
 * @param {MovieFilter} [filter] - Filters to apply to the movie query.
 * @param {SortType} [sortBy] - The sorting criterion for the movies.
 */
export const handlePreFetch = async (
  client: QueryClient,
  page: number = 0,
  limit: number = 10,
  searchBy?: string,
  filter?: MovieFilter,
  sortBy?: SortType
) => {
  const offset = (page + 1) * limit;
  await client.prefetchQuery({
    queryKey: ["Movies: " + page + 1, limit, searchBy, filter, sortBy],
    queryFn: () => getMovies(limit, offset, searchBy, filter, sortBy),
  });
};

// Get movies in library
const GET_MOVIES_BY_LIBRARY_ID = graphql(`
  query MoviesByLibraryID($libraryId: ID!) {
    moviesByLibraryID(libraryID: $libraryId) {
      imdbID
      primaryTitle
      averageRating
      runtimeMinutes
      poster
    }
  }
`);

/**
 * Get a user by unique ID.
 * @param {string} libraryID
 * @returns {Promise<Movie[]>}
 */
export const getMoviesByLibraryID = async (
  libraryID: string
): Promise<MovieContent[]> => {
  const { moviesByLibraryID } = await request(
    SERVER_URL,
    GET_MOVIES_BY_LIBRARY_ID,
    {
      libraryId: libraryID,
    }
  );
  return moviesByLibraryID as MovieContent[];
};

/**
 * React Query hook for user data by unique ID.
 * @param {string} libraryID
 * @returns {object}
 */
export const useMoviesInByLibraryIDQuery = (
  libraryID: string | undefined,
  userID: string
) => {
  return useQuery({
    queryKey: [libraryID + " : " + userID],
    queryFn: () => {
      return getMoviesByLibraryID(libraryID!);
    },
    enabled: !!libraryID,
  });
};

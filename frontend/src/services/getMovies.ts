import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
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

const getMovie = async (imdbId: string): Promise<MovieContent> => {
  const { movie } = await request(SERVER_URL, GET_MOVIE, {
    imdbId: imdbId,
  });

  return movie as MovieContent;
};

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

const getMovieStats = async () => {
  const { movieStats } = await request(SERVER_URL, GET_MOVIE_STATS);

  return movieStats as MovieStats;
};

export const useMovie = (imdbId: string) => {
  return useQuery({
    queryKey: ["Movie: " + imdbId],
    queryFn: () => getMovie(imdbId),
  });
};

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

export const useMovieStats = () => {
  return useQuery({
    queryKey: ["MovieStats"],
    queryFn: () => getMovieStats(),
  });
};

/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Library = {
  __typename?: "Library";
  libraryID: Scalars["ID"]["output"];
  movies: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  userID: Scalars["ID"]["output"];
};

export type MinutesRange = {
  max?: InputMaybe<Scalars["Int"]["input"]>;
  min?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Movie = {
  __typename?: "Movie";
  averageRating: Scalars["Float"]["output"];
  genres: Array<Scalars["String"]["output"]>;
  imdbID: Scalars["ID"]["output"];
  isAdult: Scalars["Boolean"]["output"];
  originalTitle: Scalars["String"]["output"];
  poster?: Maybe<Scalars["String"]["output"]>;
  primaryTitle: Scalars["String"]["output"];
  runtimeMinutes: Scalars["Int"]["output"];
  startYear: Scalars["Int"]["output"];
  totalVotes: Scalars["Int"]["output"];
};

export type MovieFilter = {
  averageRatingRange?: InputMaybe<RatingRange>;
  genres?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isAdult?: InputMaybe<Scalars["Boolean"]["input"]>;
  releaseYearRange?: InputMaybe<YearRange>;
  runtimeMinutesRange?: InputMaybe<MinutesRange>;
  totalVotesRange?: InputMaybe<VotesRange>;
};

export type Mutation = {
  __typename?: "Mutation";
  addLibrary: User;
  addMovieToFavorite: User;
  addMovieToLibrary: Library;
  createUser: User;
  deleteUser: User;
  removeLibrary: User;
  removeMovieFromFavorite: User;
  removeMovieFromLibrary: Library;
  renameLibrary: Library;
  updateUser: User;
};

export type MutationAddLibraryArgs = {
  libraryName: Scalars["String"]["input"];
  userID: Scalars["ID"]["input"];
};

export type MutationAddMovieToFavoriteArgs = {
  imdbID: Scalars["ID"]["input"];
  userID: Scalars["ID"]["input"];
};

export type MutationAddMovieToLibraryArgs = {
  libraryID: Scalars["ID"]["input"];
  movieID: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationDeleteUserArgs = {
  userID: Scalars["ID"]["input"];
};

export type MutationRemoveLibraryArgs = {
  libraryID: Scalars["String"]["input"];
  userID: Scalars["ID"]["input"];
};

export type MutationRemoveMovieFromFavoriteArgs = {
  imdbID: Scalars["ID"]["input"];
  userID: Scalars["ID"]["input"];
};

export type MutationRemoveMovieFromLibraryArgs = {
  libraryID: Scalars["ID"]["input"];
  movieID: Scalars["String"]["input"];
};

export type MutationRenameLibraryArgs = {
  libraryID: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  userID: Scalars["ID"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  libraries: Array<Library>;
  libraryByID: Library;
  libraryByUserAndName: Library;
  movie: Movie;
  movieInFavoriteByUserEmail: Scalars["Boolean"]["output"];
  movieInFavoriteByUserID: Scalars["Boolean"]["output"];
  movies: Array<Movie>;
  userByEmail: User;
  userByID: User;
  users: Array<User>;
};

export type QueryLibrariesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryLibraryByIdArgs = {
  libraryID: Scalars["ID"]["input"];
};

export type QueryLibraryByUserAndNameArgs = {
  name: Scalars["String"]["input"];
  userID: Scalars["ID"]["input"];
};

export type QueryMovieArgs = {
  imdbID: Scalars["ID"]["input"];
};

export type QueryMovieInFavoriteByUserEmailArgs = {
  email: Scalars["String"]["input"];
  imdbID: Scalars["ID"]["input"];
};

export type QueryMovieInFavoriteByUserIdArgs = {
  imdbID: Scalars["ID"]["input"];
  userID: Scalars["ID"]["input"];
};

export type QueryMoviesArgs = {
  filter?: InputMaybe<MovieFilter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  searchBy?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUserByEmailArgs = {
  email: Scalars["String"]["input"];
};

export type QueryUserByIdArgs = {
  userID: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RatingRange = {
  max?: InputMaybe<Scalars["Float"]["input"]>;
  min?: InputMaybe<Scalars["Float"]["input"]>;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  favorites: Array<Scalars["String"]["output"]>;
  library: Array<Library>;
  password: Scalars["String"]["output"];
  userID: Scalars["ID"]["output"];
  username: Scalars["String"]["output"];
};

export type VotesRange = {
  max?: InputMaybe<Scalars["Int"]["input"]>;
  min?: InputMaybe<Scalars["Int"]["input"]>;
};

export type YearRange = {
  max?: InputMaybe<Scalars["Int"]["input"]>;
  min?: InputMaybe<Scalars["Int"]["input"]>;
};

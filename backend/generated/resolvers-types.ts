import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Library = {
  __typename?: 'Library';
  libraryID: Scalars['ID']['output'];
  movies: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  userID: Scalars['ID']['output'];
};

export type MinutesRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type Movie = {
  __typename?: 'Movie';
  averageRating: Scalars['Float']['output'];
  genres: Array<Scalars['String']['output']>;
  imdbID: Scalars['ID']['output'];
  isAdult: Scalars['Boolean']['output'];
  originalTitle: Scalars['String']['output'];
  poster?: Maybe<Scalars['String']['output']>;
  primaryTitle: Scalars['String']['output'];
  runtimeMinutes: Scalars['Int']['output'];
  startYear: Scalars['Int']['output'];
  totalVotes: Scalars['Int']['output'];
};

export type MovieFilter = {
  averageRatingRange?: InputMaybe<RatingRange>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  isAdult?: InputMaybe<Scalars['Boolean']['input']>;
  releaseYearRange?: InputMaybe<YearRange>;
  runtimeMinutesRange?: InputMaybe<MinutesRange>;
  totalVotesRange?: InputMaybe<VotesRange>;
};

export type MovieStats = {
  __typename?: 'MovieStats';
  averageRatingRange: Range;
  releaseYearRange: Range;
  runtimeMinutesRange: Range;
  totalVotesRange: Range;
};

export type MoviesData = {
  __typename?: 'MoviesData';
  count: Scalars['Int']['output'];
  movies: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
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
  libraryName: Scalars['String']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationAddMovieToFavoriteArgs = {
  imdbID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationAddMovieToLibraryArgs = {
  libraryID: Scalars['ID']['input'];
  movieID: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userID: Scalars['ID']['input'];
};


export type MutationRemoveLibraryArgs = {
  libraryID: Scalars['String']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationRemoveMovieFromFavoriteArgs = {
  imdbID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationRemoveMovieFromLibraryArgs = {
  libraryID: Scalars['ID']['input'];
  movieID: Scalars['String']['input'];
};


export type MutationRenameLibraryArgs = {
  libraryID: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userID: Scalars['ID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  libraries: Array<Library>;
  librariesByUserID: Array<Library>;
  libraryByID: Library;
  libraryByUserAndName: Library;
  movie: Movie;
  movieInFavoriteByUserEmail: Scalars['Boolean']['output'];
  movieInFavoriteByUserID: Scalars['Boolean']['output'];
  movieStats: MovieStats;
  movies: MoviesData;
  userByEmail: User;
  userByID: User;
  users: Array<User>;
  verifyPassword: Scalars['Boolean']['output'];
};


export type QueryLibrariesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLibrariesByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userID: Scalars['ID']['input'];
};


export type QueryLibraryByIdArgs = {
  libraryID: Scalars['ID']['input'];
};


export type QueryLibraryByUserAndNameArgs = {
  name: Scalars['String']['input'];
  userID: Scalars['ID']['input'];
};


export type QueryMovieArgs = {
  imdbID: Scalars['ID']['input'];
};


export type QueryMovieInFavoriteByUserEmailArgs = {
  email: Scalars['String']['input'];
  imdbID: Scalars['ID']['input'];
};


export type QueryMovieInFavoriteByUserIdArgs = {
  imdbID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type QueryMoviesArgs = {
  filter?: InputMaybe<MovieFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<SortType>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  userID: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Range = {
  __typename?: 'Range';
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

export type RatingRange = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export enum SortType {
  DurationHilo = 'DurationHILO',
  DurationLohi = 'DurationLOHI',
  RatingHilo = 'RatingHILO',
  RatingLohi = 'RatingLOHI',
  TitleAz = 'TitleAZ',
  TitleZa = 'TitleZA',
  YearHilo = 'YearHILO',
  YearLohi = 'YearLOHI'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  favorites: Array<Scalars['String']['output']>;
  library: Array<Library>;
  password: Scalars['String']['output'];
  userID: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type VotesRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type YearRange = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Library: ResolverTypeWrapper<Library>;
  MinutesRange: MinutesRange;
  Movie: ResolverTypeWrapper<Movie>;
  MovieFilter: MovieFilter;
  MovieStats: ResolverTypeWrapper<MovieStats>;
  MoviesData: ResolverTypeWrapper<MoviesData>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Range: ResolverTypeWrapper<Range>;
  RatingRange: RatingRange;
  SortType: SortType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  VotesRange: VotesRange;
  YearRange: YearRange;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Library: Library;
  MinutesRange: MinutesRange;
  Movie: Movie;
  MovieFilter: MovieFilter;
  MovieStats: MovieStats;
  MoviesData: MoviesData;
  Mutation: {};
  Query: {};
  Range: Range;
  RatingRange: RatingRange;
  String: Scalars['String']['output'];
  User: User;
  VotesRange: VotesRange;
  YearRange: YearRange;
}>;

export type LibraryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Library'] = ResolversParentTypes['Library']> = ResolversObject<{
  libraryID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  movies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  averageRating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  imdbID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  originalTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poster?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runtimeMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalVotes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieStats'] = ResolversParentTypes['MovieStats']> = ResolversObject<{
  averageRatingRange?: Resolver<ResolversTypes['Range'], ParentType, ContextType>;
  releaseYearRange?: Resolver<ResolversTypes['Range'], ParentType, ContextType>;
  runtimeMinutesRange?: Resolver<ResolversTypes['Range'], ParentType, ContextType>;
  totalVotesRange?: Resolver<ResolversTypes['Range'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoviesDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoviesData'] = ResolversParentTypes['MoviesData']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  movies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addLibrary?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddLibraryArgs, 'libraryName' | 'userID'>>;
  addMovieToFavorite?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddMovieToFavoriteArgs, 'imdbID' | 'userID'>>;
  addMovieToLibrary?: Resolver<ResolversTypes['Library'], ParentType, ContextType, RequireFields<MutationAddMovieToLibraryArgs, 'libraryID' | 'movieID'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'userID'>>;
  removeLibrary?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveLibraryArgs, 'libraryID' | 'userID'>>;
  removeMovieFromFavorite?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveMovieFromFavoriteArgs, 'imdbID' | 'userID'>>;
  removeMovieFromLibrary?: Resolver<ResolversTypes['Library'], ParentType, ContextType, RequireFields<MutationRemoveMovieFromLibraryArgs, 'libraryID' | 'movieID'>>;
  renameLibrary?: Resolver<ResolversTypes['Library'], ParentType, ContextType, RequireFields<MutationRenameLibraryArgs, 'libraryID' | 'name'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'userID'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  libraries?: Resolver<Array<ResolversTypes['Library']>, ParentType, ContextType, Partial<QueryLibrariesArgs>>;
  librariesByUserID?: Resolver<Array<ResolversTypes['Library']>, ParentType, ContextType, RequireFields<QueryLibrariesByUserIdArgs, 'userID'>>;
  libraryByID?: Resolver<ResolversTypes['Library'], ParentType, ContextType, RequireFields<QueryLibraryByIdArgs, 'libraryID'>>;
  libraryByUserAndName?: Resolver<ResolversTypes['Library'], ParentType, ContextType, RequireFields<QueryLibraryByUserAndNameArgs, 'name' | 'userID'>>;
  movie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<QueryMovieArgs, 'imdbID'>>;
  movieInFavoriteByUserEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryMovieInFavoriteByUserEmailArgs, 'email' | 'imdbID'>>;
  movieInFavoriteByUserID?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryMovieInFavoriteByUserIdArgs, 'imdbID' | 'userID'>>;
  movieStats?: Resolver<ResolversTypes['MovieStats'], ParentType, ContextType>;
  movies?: Resolver<ResolversTypes['MoviesData'], ParentType, ContextType, Partial<QueryMoviesArgs>>;
  userByEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserByEmailArgs, 'email'>>;
  userByID?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'userID'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type RangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Range'] = ResolversParentTypes['Range']> = ResolversObject<{
  max?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  library?: Resolver<Array<ResolversTypes['Library']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Library?: LibraryResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieStats?: MovieStatsResolvers<ContextType>;
  MoviesData?: MoviesDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Range?: RangeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


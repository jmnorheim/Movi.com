import { useQuery } from "@tanstack/react-query";
import movieAPI from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { Movie, User } from "../../interfaces";

import MovieContainerGrid from "../../components/movieContainerGrid/MovieContainerGrid";
import "./HomePage.css";
import { useAuth } from "../../AuthContext";

import SearchBar from "../../components/searchBar/SearchBar";
import SortMenu, { SortType } from "../../components/sortMenu/SortMenu";

/**
 * Render the HomePage component.
 * @returns {React.FC}
 */
const HomePage: React.FC = () => {
  const [originalMovies, setOriginalMovies] = useState<Movie[] | null>(null); // All movies
  const [movies, setMovies] = useState<Movie[] | null>(null); // Movies that are actually displayed on the page (e.g. after filtering)

  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [currentSort, setCurrentSort] = useState<SortType | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: movieAPI,
  });

  const { email } = useAuth();

  // =======================================================================================================================

  useEffect(() => {
    if (currentSearch === "") {
      setMovies(originalMovies);
    }
    if (originalMovies) {
      const filteredMovies = originalMovies.filter((movie) =>
        movie.primaryTitle.toLowerCase().includes(currentSearch.toLowerCase())
      );
      setMovies(filteredMovies);
    }
  }, [currentSearch, originalMovies]);

  // =======================================================================================================================

  useEffect(() => {
    if (data && data instanceof Array) {
      // Fetch the current user's favorites from localStorage

      const usersJSON = localStorage.getItem("users");
      console.log(usersJSON);

      let users: User[] = [];
      if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        users = JSON.parse(usersJSON);
      }
      const currentUser = users.find((user: User) => user.email === email);

      console.log("Current user =", currentUser);

      let userFavorites: string[] = [];
      if (currentUser) {
        userFavorites = currentUser.favorites;
      }

      // Update movies based on the user's favorites
      const updatedMovies = data.map((movie) => ({
        ...movie,
        favorited: userFavorites.includes(movie.imdbID),
      }));

      setMovies(updatedMovies);
      setOriginalMovies(updatedMovies);
      console.log("Data has been set");
      console.log("email =", email);
    }
  }, [data, email]);

  // =======================================================================================================================

  useEffect(() => {
    console.log("Movies =", movies);
  }, [movies]);

  // =======================================================================================================================

  const toggleFavorite = (imdbID: string) => {
    // If email is not set, exit
    if (!email) return;

    // Retrieve the user's data from localStorage
    const usersJSON = localStorage.getItem("users");
    console.log(usersJSON);

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    const currentUser = users.find((user: User) => user.email === email);

    if (!currentUser) return; // exit if user not found

    // Check if the movie is already in favorites
    if (currentUser.favorites.includes(imdbID)) {
      // Remove from favorites
      currentUser.favorites = currentUser.favorites.filter(
        (favoriteImdbID: string) => favoriteImdbID !== imdbID
      );
    } else {
      // Add to favorites
      currentUser.favorites.push(imdbID);
    }

    // Find the index of the current user in the users array
    const userIndex = users.findIndex((user: User) => user.email === email);

    // Update the user's data in the array
    users[userIndex] = currentUser;

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Update the movies state to reflect the favorite toggle
    const updateFavoritedStatus = (
      movieList: Movie[] | null
    ): Movie[] | null => {
      if (!movieList) return null;

      // Update favorite status of the movie with the given imdbID
      const updatedMovieList = movieList.map((movie) => {
        if (movie.imdbID === imdbID) {
          return { ...movie, favorited: !movie.favorited };
        }
        return movie;
      });

      // Reapply sort after updating favorite status if a sort type is active
      if (currentSort) {
        return applySort(updatedMovieList, currentSort);
      }

      return updatedMovieList;
    };

    setMovies((prevMovies) => updateFavoritedStatus(prevMovies));
    setOriginalMovies((prevOriginalMovies) =>
      updateFavoritedStatus(prevOriginalMovies)
    );
  };

  // =======================================================================================================================

  const handleSort = (sortType: SortType) => {
    setCurrentSort(sortType); // Save the current sort type

    if (!movies) return;

    const sortedMovies = applySort(movies, sortType);
    setMovies(sortedMovies);
  };

  const applySort = (
    movieList: MovieContent[],
    sortType: SortType
  ): MovieContent[] => {
    return [...movieList].sort((a: MovieContent, b: MovieContent): number => {
      switch (sortType) {
        case SortType.TitleAZ:
          return a.primaryTitle.localeCompare(b.primaryTitle);
        case SortType.TitleZA:
          return b.primaryTitle.localeCompare(a.primaryTitle);
        case SortType.RatingHILO:
          return b.averageRating - a.averageRating;
        case SortType.RatingLOHI:
          return a.averageRating - b.averageRating;
        case SortType.DurationHILO:
          return b.runtimeMinutes - a.runtimeMinutes;
        case SortType.DurationLOHI:
          return a.runtimeMinutes - b.runtimeMinutes;
        case SortType.YearHILO:
          return b.startYear - a.startYear;
        case SortType.YearLOHI:
          return a.startYear - b.startYear;
        default:
          return 0;
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="homePageContainer">
      <div className="searchBarContainer">
        <SearchBar onSearch={setCurrentSearch} />
      </div>
      <div className="gridContainer">
        {movies?.length ? (
          <MovieContainerGrid
            movies={movies}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <h2 className="noMatchesText">No matches found</h2>
        )}
      </div>
      <div className="sortMenuContainer">
        <SortMenu onSort={handleSort} />
      </div>
    </div>
  );
};
export default HomePage;

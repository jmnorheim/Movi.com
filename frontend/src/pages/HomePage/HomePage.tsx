import { useQuery } from "@tanstack/react-query";
import movieAPI from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { MovieContent, User } from "../../interfaces";

import MovieContainerGrid from "../../components/movieContainerGrid/MovieContainerGrid";
import "./HomePage.css";
import { useAuth } from "../../AuthContext";

/**
 * Render the HomePage component.
 * @returns {React.FC}
 */
const HomePage: React.FC = () => {
  const [originalMovies, setOriginalMovies] = useState<MovieContent[] | null>(
    null
  ); // All movies
  const [movies, setMovies] = useState<MovieContent[] | null>(null); // Movies that are actually displayed on the page (e.g. after filtering)

  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: movieAPI,
  });

  const { email } = useAuth();

  // =======================================================================================================================

  useEffect(() => {
    if (data && data instanceof Array) {
      // Fetch the current user's favorites from localStorage
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      let currentUser = users.find((user: User) => user.email === email);

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
  }, [data]);

  // =======================================================================================================================

  useEffect(() => {
    console.log("Movies =", movies);
  }, [movies]);

  // =======================================================================================================================

  const toggleFavorite = (imdbID: string) => {
    // If email is not set, exit
    if (!email) return;

    // Retrieve the user's data from localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let currentUser = users.find((user: User) => user.email === email);

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
    setMovies((prevMovies) => {
      if (!prevMovies) return null;
      return prevMovies.map((movie) => {
        if (movie.imdbID === imdbID) {
          return { ...movie, favorited: !movie.favorited };
        }
        return movie;
      });
    });
  };

  // =======================================================================================================================

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="HomePageContainer">
      {movies ? (
        <MovieContainerGrid movies={movies} onToggleFavorite={toggleFavorite} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default HomePage;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { Movie, User } from "../../interfaces";
import { Typography } from "@mui/material";
import {
  StyledInfoBox,
  StyledInfoContainer,
  StyledMovieContainer,
  StyledPoster,
} from "./MoviePageStyles";
import { useAuth } from "../../AuthContext";
import "./MoviePage.css";

/**
 * Render the MoviePage component.
 * @returns {React.Component}
 */
const MoviePage: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { isLoggedIn, email } = useAuth();

  if (!movieId) {
    throw new Error("Movie ID is required");
  }

  const { data, isLoading } = useQuery([movieId], () => getMovieById(movieId));

  useEffect(() => {
    if (data) {
      if (checkStar(data.imdbID)) {
        setMovie({ ...data, favorited: true });
      } else {
        setMovie({ ...data, favorited: false });
      }
    }
  }, [data]);

  const checkStar = (movieId: string) => {
    if (!isLoggedIn) return false; // exit if user not logged in
    const usersJSON = localStorage.getItem("users");
    console.log(usersJSON);

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    const currentUser = users.find((user: User) => user.email === email);

    if (!currentUser) return false; // exit if user not found

    return currentUser.favorites.includes(movieId);
  };

  const toggleStar = (movieId: string) => {
    const usersJSON = localStorage.getItem("users");

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    const currentUser = users.find((user: User) => user.email === email);

    if (!currentUser) return null; // exit if user not found

    if (currentUser.favorites.includes(movieId)) {
      // Remove from favorites
      currentUser.favorites = currentUser.favorites.filter(
        (favoriteImdbID: string) => favoriteImdbID !== movieId
      );
      if (movie) {
        setMovie({ ...movie, favorited: false });
      }
    } else {
      // Add to favorites
      currentUser.favorites.push(movieId);
      if (movie) {
        setMovie({ ...movie, favorited: true });
      }
    }
    // Find the index of the current user in the users array
    const userIndex = users.findIndex((user: User) => user.email === email);

    // Update the user's data in the array
    users[userIndex] = currentUser;

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <>
      {isLoading || movie == null ? (
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      ) : (
        <StyledMovieContainer sx={{ backgroundColor: "#d1e8e2" }}>
          <Typography variant="h3" gutterBottom align="left">
            {movie.primaryTitle}
          </Typography>
          <StyledPoster src={movie.poster} alt="poster" />
          <StyledInfoBox>
            <StyledInfoContainer>
              <div className="star-container">
                {isLoggedIn && (
                  <div
                    className={`star ${
                      movie.favorited ? "star-filled" : "star-outline"
                    }`}
                    onClick={() => {
                      toggleStar(movie.imdbID);
                    }}
                  >
                    ★
                  </div>
                )}
              </div>
              <Typography variant="h5">
                Original title: {movie.originalTitle}
              </Typography>
              <Typography variant="h5">
                Rating: {movie.averageRating}
              </Typography>
              <Typography variant="h5">
                Total votes: {movie.totalVotes}
              </Typography>
              <Typography variant="h5">
                Runtime: {movie.runtimeMinutes} minutes
              </Typography>
              <Typography variant="h5">
                Genres: {movie.genres.toString()}
              </Typography>
              <Typography variant="subtitle1">Movie ID: {movieId}</Typography>
            </StyledInfoContainer>
          </StyledInfoBox>
        </StyledMovieContainer>
      )}
    </>
  );
};

export default MoviePage;

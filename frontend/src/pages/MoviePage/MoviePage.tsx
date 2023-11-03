import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { Movie, User } from "../../interfaces";
import { Typography } from "@mui/material";
import { useAuth } from "../../services/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./MoviePage.css";

/**
 * Render the MoviePage component.
 * @returns {React.Component}
 */
const MoviePage: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { isLoggedIn, email } = useAuth();

  const navigate = useNavigate();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const printGenresNicely = (genres: string[]) => {
    let genresString = "";
    genres.forEach((genre: string) => {
      genresString += genre + ", ";
    });
    return genresString.slice(0, -2);
  };

  return (
    <>
      <button
        className="arrow-back-button"
        onClick={() => navigate(-1)}
      ></button>
      {isLoading || movie == null ? (
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      ) : (
        <div className="styled-movie-container">
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            className="title"
          >
            {movie.primaryTitle}
          </Typography>
          <img className="styled-poster" src={movie.poster} alt="poster" />
          <div className="styled-info-box">
            <div className="styled-info-container">
              <div className="star-container">
                {isLoggedIn && (
                  <div
                    className={`moviepage-star ${
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
                Genres: {printGenresNicely(movie.genres)}
              </Typography>
              <Typography variant="subtitle1">Movie ID: {movieId}</Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoviePage;

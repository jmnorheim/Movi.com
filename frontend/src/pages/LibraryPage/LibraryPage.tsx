import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Movie, User } from "../../interfaces";
import { useAuth } from "../../services/auth/AuthContext";
import { getMovieById } from "../../services/movieAPI";
import MovieContainer from "../../components/movieContainer/MovieContainer";
import "./LibraryPage.css";

const LibraryPage = () => {
  const { libraryName } = useParams();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const { email } = useAuth();

  const navigate = useNavigate();

  const getMovies = () => {
    const usersJSON = localStorage.getItem("users");

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    const currentUser = users.find((user: User) => user.email === email);

    if (!currentUser) return null; // exit if user not found

    const movies: Movie[] = [];

    if (libraryName !== "Favorites") {
      const currentLibrary = currentUser.library.find(
        (library) => library.name === libraryName
      );
      if (!currentLibrary) return null; // exit if user not found

      currentLibrary.movies.forEach((movieId) => {
        let movie: Movie | null = null;
        getMovieById(movieId)
          .then((res) => {
            movie = {
              ...res,
              favorited: currentUser.favorites.includes(movieId),
            };
            movies.push(movie);
          })
          .catch((err) => {
            throw new Error("Error getting movie by ID");
          });
      });
    } else {
      currentUser.favorites.forEach((movieId) => {
        let movie: Movie | null = null;
        getMovieById(movieId)
          .then((res) => {
            movie = {
              ...res,
              favorited: true,
            };
            movies.push(movie);
          })
          .catch((err) => {
            throw new Error("Error getting movie by ID");
          });
      });
    }

    setMovies(movies);
  };

  useEffect(() => {
    getMovies();
  }, [email]);

  return (
    <div className="LibraryPage">
      <button className="backButton" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2 className="libraryName">{libraryName}</h2>
      {movies &&
        movies.map((movie) => (
          <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
            <MovieContainer movie={movie} />
          </Link>
        ))}
    </div>
  );
};

export default LibraryPage;

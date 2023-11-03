/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Movie, User } from "../../interfaces";
import { useAuth } from "../../AuthContext";
import { getMovieById } from "../../services/movieAPI";
import MovieContainer from "../../components/movieContainer/MovieContainer";
import "./LibraryPage.css";
import PageFooter from "../../components/pageFooter/PageFooter";

import { ArrowCircleLeftBlack } from "../../assets/icons/ArrowCircleLeftBlack";
import { useNavbarColor } from "../../services/utilities/NavbarColorContext";

const LibraryPage = () => {
  const { libraryName } = useParams();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const { email } = useAuth();
  const { setIsBlack } = useNavbarColor();

  useEffect(() => {
    setIsBlack(true);

    // Optional: Synchronize with localStorage if needed
    localStorage.setItem("navbarIsBlack", "true");

    // When component unmounts, you might want to reset the color
    return () => {
      setIsBlack(false);
      localStorage.setItem("navbarIsBlack", "false");
    };
  }, [setIsBlack]);

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

  function formatNumber(number: number) {
    return number < 10 ? `0${number}` : number.toString();
  }

  return (
    <>
      <div className="LibraryPage">
        <div className="back-button-container">
          <button className="back-button-library" onClick={() => navigate(-1)}>
            <ArrowCircleLeftBlack />
          </button>
        </div>
        <div className="library-title">
          <div className="text-wrapper">{libraryName}</div>
        </div>
        <div className="column-info">
          <div className="invisible">01</div>
          <div className="group">
            <div className="text-wrapper">Title</div>
            <div className="div">Rating</div>
            <div className="text-wrapper-2">Length</div>
          </div>
        </div>
        {movies &&
          movies.map((movie, index) => (
            <Link to={"/movie/" + movie.imdbID} key={movie.imdbID}>
              <div className="list-row">
                <div className="text-wrapper">{formatNumber(index + 1)}</div>
                <div className="group">
                  <div className="div">{movie.primaryTitle}</div>
                  <div className="text-wrapper-2">{movie.averageRating}</div>
                  <div className="text-wrapper-3">
                    {movie.runtimeMinutes} Minutes
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div>
        <PageFooter></PageFooter>
      </div>
    </>
  );
};

export default LibraryPage;

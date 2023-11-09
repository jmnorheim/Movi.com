import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { Movie, User } from "../../interfaces";
import { Typography } from "@mui/material";
import { useAuth } from "../../services/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft } from "../../assets/icons/ArrowCircleLeft";
import "./MoviePage.css";

import { HeartIcon as Heart } from "../../assets/icons/HeartIcon";
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";
import imdb_logo from "../../assets/images/imdb_logo.png";
import moviepage_background from "../../assets/images/moviepage_background.png";
import PageFooter from "../../components/pageFooter/PageFooter";

import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";
import { useMovie } from "../../services/getMovies";

/**
 * Render the MoviePage component.
 * @returns {React.Component}
 */
const MoviePage: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { isLoggedIn, email } = useAuth();

  effect(() => {
    navbarColor.value = "white";
  });

  const navigate = useNavigate();

  if (!movieId) {
    throw new Error("Movie ID is required");
  }

  const { data, isLoading } = useMovie(movieId);

  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data]);

  const printGenresNicely = (genres: string[]) => {
    let genresString = "";
    genres.forEach((genre: string) => {
      genresString += genre + ", ";
    });
    return genresString.slice(0, -2);
  };

  const generateRandomDateWithinYear = (year: number): string => {
    const start = new Date(year, 0, 1); // start of the year
    const end = new Date(year + 1, 0, 1); // start of the next year

    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const day = String(randomDate.getDate()).padStart(2, "0");
    const month = String(randomDate.getMonth() + 1).padStart(2, "0"); // JS months are 0-based

    return `${day}/${month}/${year}`;
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
        <>
          <div className="movie-card">
            <img className="background-image" src={moviepage_background} />
            <div className="overlap-group">
              <div className="div">
                <div className="div-2">
                  <div className="div-3">
                    <button
                      className="back-button"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowCircleLeft className="vuesax-linear-arrow" />
                    </button>
                    <div className="text-wrapper">{movie.originalTitle}</div>
                  </div>
                  <div className="text-wrapper-2">
                    {movie.primaryTitle} ({movie.startYear})
                  </div>
                  <div className="release-data-text">
                    {" "}
                    {generateRandomDateWithinYear(movie.startYear)}
                  </div>
                  <div className="div-4">
                    <div className="div-wrapper">
                      {movie.isAdult ? (
                        <div className="text-wrapper-4">PG-18</div>
                      ) : (
                        <div className="text-wrapper-4">PG-13</div>
                      )}
                    </div>
                    <p className="text-wrapper-3">
                      • {printGenresNicely(movie.genres)}
                    </p>
                    <div className="text-wrapper-3">
                      • {movie.runtimeMinutes} minutes
                    </div>
                  </div>
                  <div className="div-5">
                    <div className="div-4">
                      <img className="img" alt="Image" src={imdb_logo} />
                      <div className="text-wrapper-5">
                        {movie.averageRating}/10
                      </div>
                    </div>
                    <div className="div-4">
                      <div className="text-wrapper-6">Votes</div>
                      <div className="text-wrapper-7">({movie.totalVotes})</div>
                    </div>
                  </div>
                  <div className="div-5">
                    <button className="button">
                      <div className="text-wrapper-8">Add To Library</div>
                      <ArrowDownIcon className="icon-instance" />
                    </button>
                    <Heart className="vuesax-linear-heart" />
                  </div>
                </div>
                <div className="poster-image-container">
                  <img
                    className="poster-image"
                    alt="movieposter"
                    src={movie.poster}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-container">
            <PageFooter></PageFooter>
          </div>
        </>
        // <div className="styled-movie-container">
        //   <Typography
        //     variant="h3"
        //     gutterBottom
        //     align="center"
        //     className="title"
        //   >
        //     {movie.primaryTitle}
        //   </Typography>
        //   <img className="styled-poster" src={movie.poster} alt="poster" />
        //   <div className="styled-info-box">
        //     <div className="styled-info-container">
        //       <div className="star-container">
        //         {isLoggedIn && (
        //           <div
        //             className={`moviepage-star ${
        //               movie.favorited ? "star-filled" : "star-outline"
        //             }`}
        //             onClick={() => {
        //               toggleStar(movie.imdbID);
        //             }}
        //           >
        //             ★
        //           </div>
        //         )}
        //       </div>
        //       <Typography variant="h5">
        //         Original title: {movie.originalTitle}
        //       </Typography>
        //       <Typography variant="h5">
        //         Rating: {movie.averageRating}
        //       </Typography>
        //       <Typography variant="h5">
        //         Total votes: {movie.totalVotes}
        //       </Typography>
        //       <Typography variant="h5">
        //         Runtime: {movie.runtimeMinutes} minutes
        //       </Typography>
        //       <Typography variant="h5">
        //         Genres: {printGenresNicely(movie.genres)}
        //       </Typography>
        //       <Typography variant="subtitle1">Movie ID: {movieId}</Typography>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default MoviePage;

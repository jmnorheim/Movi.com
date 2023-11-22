/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieContent } from "../../interfaces";
import { Typography } from "@mui/material";
import { useAuth } from "../../services/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft } from "../../assets/icons/ArrowCircleLeft";
import "./MoviePage.css";

import imdb_logo from "../../assets/images/imdb_logo.png";
import moviepage_background from "../../assets/images/moviepage_background.png";
import PageFooter from "../../components/pageFooter/PageFooter";
import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";
import { useMovie } from "../../services/getMovies";
import MovieContainerGrid from "../../components/movieContainerGrid/MovieContainerGrid.tsx";
import { useRecommendedMovies } from "../../services/getRecommended.ts";
import AddToLibraryButton from "../../components/addToLibraryButton/AddToLibraryButton.tsx";
import HeartButton from "../../components/heartButton/HeartButton.tsx";

import empty_poster_pic from "../../assets/images/empty_poster_pic.png";

/**
 * Render the MoviePage component.
 * @returns {React.Component}
 */
const MoviePage: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieContent | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<MovieContent[]>();
  const { userID } = useAuth();
  const navigate = useNavigate();

  effect(() => {
    navbarColor.value = "white";
  });

  if (!movieId) {
    throw new Error("Movie ID is required");
  }

  const { data, isLoading } = useMovie(movieId);

  const { data: recommendedData } = useRecommendedMovies(movie);

  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data]);

  let posterSrc = movie?.poster;
  let posterIsEmpty = false;
  if (movie) {
    posterSrc = movie.poster.startsWith("data")
      ? empty_poster_pic
      : movie.poster;
    posterIsEmpty = movie.poster.startsWith("data");
  }

  useEffect(() => {
    if (recommendedData) {
      setRecommendedMovies(
        recommendedData.filter((movie) => movie.imdbID !== movieId)
      );
    }
  }, [recommendedData, movieId]);

  const printGenresNicely = (genres: string[]) => {
    let genresString = "";
    genres.forEach((genre: string) => {
      genresString += genre + ", ";
    });
    return genresString.slice(0, -2);
  };

  const generateRandomDateWithinYear = (year: number): string => {
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const day = String(randomDate.getDate()).padStart(2, "0");
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");

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
                    <div className="div-6">
                      <img className="img" alt="Image" src={imdb_logo} />
                      <div className="text-wrapper-5">
                        {movie.averageRating}/10
                      </div>
                    </div>
                    <div className="div-6">
                      <div className="text-wrapper-6">Votes</div>
                      <div className="text-wrapper-7">({movie.totalVotes})</div>
                    </div>
                  </div>
                  {userID && (
                    <div className="div-7">
                      <AddToLibraryButton
                        imdbID={movie.imdbID}
                        width="230px"
                        height="40px"
                        fontSize="22px"
                      />
                      <HeartButton userID={userID} movieID={movie.imdbID} />
                    </div>
                  )}
                </div>
                <div className="poster-image-container">
                  <div className="poster-content">
                    <img
                      className="poster-image"
                      alt="movieposter"
                      src={posterSrc}
                    />
                    {posterIsEmpty && (
                      <div className="no-poster-text">No poster available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {recommendedMovies && (
            <div className="recommended">
              <h1 className="recommended-text">Recommended</h1>
              <MovieContainerGrid movies={recommendedMovies} />
            </div>
          )}
          <div className="footer-container">
            <PageFooter></PageFooter>
          </div>
        </>
      )}
    </>
  );
};

export default MoviePage;

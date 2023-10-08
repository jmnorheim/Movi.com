import { useQuery } from "@tanstack/react-query";
import movieAPI from "../../services/movieAPI";
import { useEffect, useState } from "react";
import { Movie } from "../../interfaces";

import MovieContainerGrid from "../../components/movieContainerGrid/MovieContainerGrid";
import "./HomePage.css";

/**
 * Render the HomePage component.
 * @returns {React.FC}
 */
const HomePage: React.FC = () => {
  const [originalMovies, setOriginalMovies] = useState<Movie[] | null>(null); // All movies
  const [movies, setMovies] = useState<Movie[] | null>(null); // Movies that are actually displayed on the page (e.g. after filtering)

  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: movieAPI,
  });

  useEffect(() => {
    if (data && data instanceof Array) {
      const updatesMovies = data.map((movie) => ({
        ...movie,
        favorited: false,
      }));
      setMovies(updatesMovies);
      setOriginalMovies(updatesMovies);
      console.log("Data has been set");
    }
  }, [data]);

  useEffect(() => {
    console.log("Movies =", movies);
  }, [movies]);

  const toggleFavorite = (imdbID: string) => {
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

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Library } from "../../interfaces";
import { useMovie } from "../../services/getMovies";
import "./MyLibraryContainer.css";

interface MyLibraryProps {
  library: Library;
}

/**
 * Displays a library container with an image if available.
 */
const MyLibaryContainer = ({ library }: MyLibraryProps) => {
  // State to hold the image URL
  const [image, setImage] = useState<string>("");

  // Fetch movie data based on the library's first movie ID
  const { data: movie } = useMovie(library.movies[0]);

  /**
   * Set the image URL when movie data changes
   */
  useEffect(() => {
    if (movie && movie.poster) {
      setImage(movie.poster);
    }
  }, [movie]);

  // Renter the library container
  // Return =============================================================
  return (
    <div className="library-container">
      <div className="library-content-container">
        {image ? (
          <div className="populated-library-container">
            <div className="library-text">{library.name}</div>
            <img className="library-image" src={image} />
          </div>
        ) : (
          <div className="library-text">Library {library.name} is empty</div>
        )}
      </div>
    </div>
  );
};

export default MyLibaryContainer;

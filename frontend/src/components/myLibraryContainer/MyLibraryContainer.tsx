import { useEffect, useState } from "react";
import { Library } from "../../interfaces";
import { useMoviesInByLibraryIDQuery } from "../../services/getMovies";
import "./MyLibraryContainer.css";
import empty_library from "../../assets/images/empty_library.png";
import { useAuth } from "../../services/auth/AuthContext";

interface MyLibraryProps {
  library: Library;
}

const MyLibaryContainer = ({ library }: MyLibraryProps) => {
  const [posterImages, setPosterImages] = useState<string[] | null>(null);
  const { userID } = useAuth();
  const { data: moviesData } = useMoviesInByLibraryIDQuery(
    library.libraryID,
    userID
  );

  useEffect(() => {
    if (!moviesData) return;

    const updatedPosters = Array.from({ length: 4 }, (_, i) => {
      // Return the poster URL or the empty library image
      return moviesData && moviesData[i] ? moviesData[i].poster : empty_library;
    });

    setPosterImages(updatedPosters);
  }, [moviesData]);

  const isLibraryEmpty = !moviesData || moviesData.length === 0;

  // Renter the library container
  // Return =============================================================
  return (
    <div className="library-container">
      <div className="library-content-container">
        {!isLibraryEmpty ? (
          <div className="populated-mylibrary-container">
            <div className="text-wrapper">Library {library.name}</div>
            <div className="div">
              {posterImages &&
                posterImages.map((img, index) => (
                  <img
                    key={index}
                    className="rectangle"
                    alt={`Movie Poster ${index}`}
                    src={img}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="empty-mylibrary-container">
            <div className="empty-library-text">
              Library {library.name} is empty
            </div>
            <img className="empty-library-image" src={empty_library} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibaryContainer;

import { useEffect, useState } from "react";
import { Library } from "../../interfaces";
import { useMoviesInByLibraryIDQuery } from "../../services/getMovies";
import "./MyLibraryContainer.css";
import empty_library from "../../assets/images/empty_library.png";
import { useAuth } from "../../services/auth/AuthContext";

interface MyLibraryProps {
  library: Library;
}

/**
 * MyLibraryContainer Component
 *
 * This component renders an individual library container showing a preview of movies in the library. It displays up to four movie posters or a placeholder image and a message if the library is empty.
 *
 * Props:
 * @param {Library} library - The library object containing details like the library's ID and name.
 *
 * Features:
 * - Displays the name of the library and a preview of up to four movies in the library using their posters.
 * - Shows a placeholder image and a message indicating that the library is empty if there are no movies in the library.
 * - Utilizes the `useMoviesInByLibraryIDQuery` hook to fetch the movies in the library.
 * - Dynamically updates the poster previews based on the movies in the library.
 * - Handles both populated and empty states of the library, providing appropriate UI for each case.
 */
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

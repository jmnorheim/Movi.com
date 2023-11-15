import { Link, useNavigate, useParams } from "react-router-dom";
import "./LibraryPage.css";
import PageFooter from "../../components/pageFooter/PageFooter";
import { ArrowCircleLeftBlack } from "../../assets/icons/ArrowCircleLeftBlack";
import { useMoviesInByLibraryIDQuery } from "../../../src/services/getMovies.ts";

/**
 * Render the RegisterPage component.
 * @returns {React.FC}
 */
const LibraryPage: React.FC = () => {
  // State definitions
  const { libraryProp } = useParams();

  // Set libraryID and libraryName
  let libraryID: string = "";
  let libraryName: string = "";
  if (libraryProp) {
    [libraryID, libraryName] = libraryProp.split(":");
  }

  // Hooks for fetching movies and navigation
  const { data: movies } = useMoviesInByLibraryIDQuery(libraryID);
  const navigate = useNavigate();

  /**
   * Formats a number to a two-digit string (e.g., 1 becomes "01").
   */
  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number.toString();
  };

  // Return =============================================================
  return (
    <>
      <div className="LibraryPage">
        {/* Back navigation button */}
        <div className="back-button-container">
          <button className="back-button-library" onClick={() => navigate(-1)}>
            <ArrowCircleLeftBlack />
          </button>
        </div>

        {/* Display library title */}
        <div className="library-title">
          <div className="text-wrapper">{libraryName}</div>
        </div>

        {/* Movie list headers */}
        <div className="column-info">
          <div className="invisible">01</div>
          <div className="group">
            <div className="text-wrapper">Title</div>
            <div className="div">Rating</div>
            <div className="text-wrapper-2">Length</div>
          </div>
        </div>

        {/* Display list of movies */}
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

      {/* Footer component */}
      <div>
        <PageFooter></PageFooter>
      </div>
    </>
  );
};

export default LibraryPage;

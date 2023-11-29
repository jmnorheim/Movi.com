import { Library } from "../../interfaces";
import { Link } from "react-router-dom";
import "./MyLibrariesGrid.css";

import star from "../../assets/images/star.svg";
import MyLibraryContainer from "../myLibraryContainer/MyLibraryContainer";
import { AddLibraryIcon } from "../../assets/icons/AddLibraryIcon";

interface MyLibrariesGridProps {
  libraries: Library[] | null;
  onCreateNewPress: (value: boolean) => void;
}

/**
 * MyLibrariesGrid Component
 *
 * This component displays a grid of user's libraries including a special container for favorites and an option to create a new library. Each library is presented in a `MyLibraryContainer`, and the favorites are represented with a star icon.
 *
 * Props:
 * @param {Library[] | null} libraries - An array of library objects to be displayed in the grid. If null, no libraries are displayed.
 * @param {(value: boolean) => void} onCreateNewPress - A function that is called when the 'Create New' button is pressed.
 *
 * Features:
 * - A dedicated container for 'Favorites' which, when clicked, navigates to a page showing the user's favorite movies.
 * - Renders each user's library in a `MyLibraryContainer` with a link to the specific library's page.
 * - Provides a 'Create New' button for adding new libraries.
 * - Utilizes the `AddLibraryIcon` to visually represent the action of creating a new library.
 * - Flexibly handles the case when the `libraries` prop is null by not displaying any library containers.
 */
const MyLibrariesGrid = ({
  libraries = [],
  onCreateNewPress,
}: MyLibrariesGridProps) => {
  return (
    <div className="MyLibrariesGrid">
      <Link to={"/my-library/favorites"}>
        <div className="favorites-container">
          <div className="div">
            <img className="big-star" alt="Star" src={star} />
            <div className="text-wrapper">Favorites</div>
          </div>
        </div>
      </Link>
      {Array.isArray(libraries) &&
        libraries?.map(
          (library, index) =>
            index >= 0 && (
              <Link
                to={"/my-library/" + library.libraryID + ":" + library.name}
                key={index}
              >
                <MyLibraryContainer library={library} />
              </Link>
            )
        )}
      <div className="add-new-container">
        <button
          className="add-new-button"
          onClick={() => onCreateNewPress(true)}
        >
          <div className="div">
            <div className="text-wrapper">Create New</div>
            <AddLibraryIcon className="vuesax-linear" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyLibrariesGrid;

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

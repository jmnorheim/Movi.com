import { Library, User } from "../../interfaces";
import { Link } from "react-router-dom";
import MyLibaryContainer from "../myLibraryContainer/MyLibraryContainer";
import "./MyLibrariesGrid.css";

interface MyLibrariesGridProps {
  libraries: Library[] | null;
}
const MyLibrariesGrid = ({ libraries }: MyLibrariesGridProps) => {
  console.log("Libraries inside the grid:", libraries);

  return (
    <div className="MyLibrariesGrid">
      {libraries?.map((library, index) => (
        <Link to={"/my-library/" + library.name} key={index}>
          <MyLibaryContainer library={library} />
        </Link>
      ))}
    </div>
  );
};

export default MyLibrariesGrid;

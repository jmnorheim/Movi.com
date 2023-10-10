import { Button } from "@mui/material";
import MyLibrariesGrid from "../../components/myLibrariesGrid/myLibrariesGrid";

/**
 * Render the MyLibaryPage component.
 * @returns {React.Component}
 */
const MyLibraryPage: React.FC = () => {
  return (
    <>
      <h1>My Library Page</h1>
      <MyLibrariesGrid />
      <Button variant="contained">Create Library</Button>
    </>
  );
};

export default MyLibraryPage;

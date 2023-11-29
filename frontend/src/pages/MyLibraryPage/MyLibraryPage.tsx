import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import MyLibrariesGrid from "../../components/myLibrariesGrid/MyLibrariesGrid";
import { useState } from "react";
import { useAuth } from "../../services/auth/AuthContext";
import "./MyLibraryPage.css";
import { DocumentIcon } from "../../assets/icons/DocumentIcon.tsx";
import PageFooter from "../../components/pageFooter/PageFooter";
import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";
import { useCreateLibrary } from "../../services/mutateLibrary.ts";
import { useUsersLibrariesQuery } from "../../services/getUserLibraries.ts";

/**
 * MyLibraryPage Component
 *
 * This component renders the user's personal library page. It includes a section displaying all of the user's libraries using `MyLibrariesGrid`, and provides functionality to create a new library through a dialog form.
 *
 * Features:
 * - Displays the user's libraries in a grid format using `MyLibrariesGrid`.
 * - Provides a button to open a dialog form for creating a new library.
 * - Uses `useAuth` for authentication logic and `useUsersLibrariesQuery` to fetch user library data.
 * - Implements `useCreateLibrary` mutation for adding new libraries.
 * - The 'Create Library' dialog includes a text field to enter the name of the new library and buttons to cancel or confirm the creation.
 * - Utilizes Material-UI components for dialog, text field, and buttons.
 * - Includes the `PageFooter` component for consistent page layout.
 * - Navbar color is dynamically set to black using `navbarColor` signal.
 */
const MyLibraryPage: React.FC = () => {
  const [dialogForm, setDialogForm] = useState(false);
  const [nameOfLibrary, setNameOfLibrary] = useState("");

  // Hooks for user authentication and data fetching
  const { userID } = useAuth();
  const { data: libraries } = useUsersLibrariesQuery(userID);
  const { mutate } = useCreateLibrary(userID);

  effect(() => {
    navbarColor.value = "black";
  });

  const addLibrary = (libraryName: string) => {
    mutate(libraryName);
  };

  // JSX=======================================================================================================

  return (
    <>
      <>
        {libraries && (
          <div className="myLibraryPageContainer">
            <div className="title-container">
              <div className="text-wrapper">My Libraries</div>
              <button
                className="create-library-button"
                onClick={() => {
                  setDialogForm(true);
                }}
              >
                <div className="div">Create Library</div>
                <DocumentIcon className="vuesax-linear" />
              </button>
            </div>
            <MyLibrariesGrid
              libraries={libraries}
              onCreateNewPress={setDialogForm}
            />
          </div>
        )}
        <div style={{ marginTop: "50px" }}>
          <PageFooter />
        </div>
      </>

      <Dialog open={dialogForm} onClose={() => setDialogForm(false)}>
        <DialogTitle>Create Library</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start by giving your new library a name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Library Name"
            type="name"
            fullWidth
            variant="standard"
            value={nameOfLibrary}
            onChange={(e) => setNameOfLibrary(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addLibrary(nameOfLibrary);
                setDialogForm(false);
                setNameOfLibrary("");
                e.preventDefault();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogForm(false);
              setNameOfLibrary("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              addLibrary(nameOfLibrary);
              setDialogForm(false);
              setNameOfLibrary("");
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyLibraryPage;

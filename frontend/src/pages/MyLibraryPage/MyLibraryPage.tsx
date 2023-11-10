/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react";
import { Library, User } from "../../interfaces";
import { useAuth } from "../../services/auth/AuthContext";
import "./MyLibraryPage.css";

import { DocumentIcon } from "../../assets/icons/DocumentIcon.tsx";
import PageFooter from "../../components/pageFooter/PageFooter";
import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";

import { useCreateLibrary } from "../../services/mutateLibrary.ts";
import { useUserQuery } from "../../services/getUser.ts";

/**
 * Render the MyLibaryPage component.
 * @returns {React.Component}
 */
const MyLibraryPage: React.FC = () => {
  const [dialogForm, setDialogForm] = useState(false);
  const [nameOfLibrary, setNameOfLibrary] = useState("");
  const [libraries, setLibraries] = useState<Library[] | null>(null);
  const { userID } = useAuth();
  const { data: currentUser } = useUserQuery(userID);
  const { mutate } = useCreateLibrary(userID);

  effect(() => {
    navbarColor.value = "black";
  });

  /**
   * Fetches the current users libraries and updates the state.
   */
  useEffect(() => {
    if (currentUser) {
      getUserLibraries();
    }
  }, [currentUser]);

  const getUserLibraries = () => {
    if (currentUser) {
      const favLibrary: Library = {
        name: "Favorites",
        movies: currentUser.favorites,
      };
      setLibraries([favLibrary, ...currentUser.library]);
    }
  };

  /**
   * Adds a new library to the users.
   */
  const addLibrary = (libraryName: string) => {
    mutate(libraryName);
  };

  return (
    <>
      <>
        <div className="myLibraryPageContainer">
          <div className="title-container">
            <div className="text-wrapper">My Library</div>
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

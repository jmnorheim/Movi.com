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
 * Render the MyLibaryPage component.
 * @returns {React.Component}
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

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

import { DocumentIcon } from "../../assets/icons/DocumentIcon";
import PageFooter from "../../components/pageFooter/PageFooter";
import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";

/**
 * Render the MyLibaryPage component.
 * @returns {React.Component}
 */
const MyLibraryPage: React.FC = () => {
  const [dialogForm, setDialogForm] = useState(false);
  const [nameOfLibrary, setNameOfLibrary] = useState("");
  const [libraries, setLibraries] = useState<Library[] | null>(null);
  const { email } = useAuth();

  effect(() => {
    navbarColor.value = "black";
  });

  const getUserLibraries = () => {
    const libraries: Library[] = [];
    const usersJSON = localStorage.getItem("users");

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    const currentUser = users.find((user: User) => user.email === email);

    if (currentUser) {
      const favLibrary: Library = {
        name: "Favorites",
        movies: currentUser.favorites,
      };
      libraries.push(favLibrary);
      libraries.push(...currentUser.library);
      console.log("Libraries:", libraries);
      setLibraries(libraries);
    }
  };

  const addLiabrary = (name: string) => {
    //TODO make sure the user do not have that library name already
    const usersJSON = localStorage.getItem("users");

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    const currentUser = users.find((user: User) => user.email === email);

    if (!currentUser) {
      return;
    }

    if (currentUser) {
      const newLibrary: Library = {
        name: name,
        movies: [],
      };
      currentUser.library.push(newLibrary);
    }

    // Find the index of the current user in the users array
    const userIndex = users.findIndex((user: User) => user.email === email);

    // Update the user's data in the array
    users[userIndex] = currentUser;

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    getUserLibraries();
    console.log("Library has been added");
  };

  useEffect(() => {
    getUserLibraries();
  }, [email]);

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
          <PageFooter></PageFooter>
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
          <Button onClick={() => setDialogForm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              addLiabrary(nameOfLibrary);
              setDialogForm(false);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
    // <div className="myLibraryPageContainer">
    //   <div className="mylibraryTop">
    //     <h1 className="titleText">My Library Page</h1>
    //   </div>
    //   <div className="buttonContainer">
    //     <Button
    //       className="createLibraryButton"
    //       variant="contained"
    //       onClick={() => {
    //         setDialogForm(true);
    //       }}
    //     >
    //       Create Library
    //     </Button>
    //   </div>
    //   <MyLibrariesGrid libraries={libraries} />
    // </div>
  );
};

export default MyLibraryPage;

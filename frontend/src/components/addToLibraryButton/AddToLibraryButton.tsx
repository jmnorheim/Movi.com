import React, { useState } from "react";
import { ArrowDownIcon } from "../../../src/assets/icons/ArrowDownIcon";
import { useAuth } from "../../services/auth/AuthContext";
import { useUsersLibrariesQuery } from "../../services/getUserLibraries.ts";
import { addMovieToLibrary } from "../../services/addMovieToLibrary.ts";
import { addMovieToFavorite } from "../../services/addMovieToFavorites.ts";

const AddToLibraryButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userID } = useAuth();
  const { data: libraries } = useUsersLibrariesQuery(userID);

  const addMovieLibrary = async (libID: string, imdbID: string) => {
    await addMovieToLibrary(imdbID, libID);
  };

  const addMovieFavorites = async (userId: string, imdbID: string) => {
    await addMovieToFavorite(userId, imdbID);
  };

  return (
    <button className="button">
      <div className="text-wrapper-2">Add To Library</div>
      <ArrowDownIcon className="icon-instance" />
    </button>
  );
};

export default AddToLibraryButton;

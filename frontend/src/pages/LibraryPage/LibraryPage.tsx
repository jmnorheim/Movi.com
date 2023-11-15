// LibraryPage.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Movie, User, Library } from "../../interfaces";
import { useAuth } from "../../services/auth/AuthContext";
import { getMovieById } from "../../services/movieAPI";
import "./LibraryPage.css";
import PageFooter from "../../components/pageFooter/PageFooter";
import { ArrowCircleLeftBlack } from "../../assets/icons/ArrowCircleLeftBlack";
import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";
import { useUserQuery } from "../../services/getUser.ts";
import { useUsersLibrariesQuery } from "../../../src/services/getUserLibraries";
import { useLibraryByUserAndNameQuery } from "../../services/getLibrary.ts";
/**
 * Render the RegisterPage component.
 * @returns {React.FC}
 */
const LibraryPage: React.FC = () => {
  const { libraryName } = useParams();
  const { userID } = useAuth();
  const { data: library } = useLibraryByUserAndNameQuery(userID, libraryName);

  console.log(library);
  return (
    <>
      {library && (
        <div>
          <h1>Library Page</h1>
          <p>Current Librar: {library.movies}</p>
        </div>
      )}
    </>
  );
};

export default LibraryPage;

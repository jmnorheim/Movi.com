import { useEffect, useState } from "react";
import MyLibary from "../myLibrary/MyLibrary";
import { Library, User } from "../../interfaces";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";

const MyLibrariesGrid = () => {
  const [libraries, setLibraries] = useState<Library[] | null>(null);
  const { email } = useAuth();

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
      setLibraries(libraries);
    }
  };

  useEffect(() => {
    getUserLibraries();
  });

  return (
    <>
      <p>My LibrariesGrid</p>
      {libraries?.map((library, index) => (
        <Link to={"/library/" + library.name} key={index}>
          <MyLibary library={library} />
        </Link>
      ))}
    </>
  );
};

export default MyLibrariesGrid;

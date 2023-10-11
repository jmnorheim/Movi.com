import { createContext, useContext, useEffect, useState } from "react";
import { Library, User } from "./interfaces";

/**
 * Type; authentication context values.
 */
type AuthContextType = {
  isLoggedIn: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
  getLibraries: () => Library[]; // new
  updateLibrary: (libraryName: string, movieId: string) => void; // new
};

/**
 * Authentication context.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook. Used to access the authentication context.
 * @throws {Error}
 * @returns {AuthContextType}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Type AuthProvider props.
 */
type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides authentication context to child components.
 * @param {AuthProviderProps} props
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [libraries, setLibraries] = useState<Library[]>([]);

  /**
   * Login function.
   * Persists the logged-in state.
   * @param {string} email
   */
  const login = (email: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email); // Store email in local storage
    setIsLoggedIn(true);
    setEmail(email);
    console.log(email);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email"); // Remove email from local storage
    setIsLoggedIn(false);
    setEmail("");
  };

  /**
   * Check the local storage for persisted login state and email.
   * Updates the local state.
   */
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  // ======================================================================================

  const getLibraries = (): Library[] => {
    const libraries: Library[] = [];
    const usersJSON = localStorage.getItem("users");

    if (usersJSON) {
      let users: User[] = [];
      try {
        users = JSON.parse(usersJSON) as User[];
      } catch (error) {
        console.error("Error parsing users JSON:", error);
        return libraries;
      }

      const currentUser = users.find((user: User) => user.email === email);

      if (currentUser) {
        const favLibrary: Library = {
          name: "Favorites",
          movies: currentUser.favorites,
        };
        libraries.push(favLibrary);
        libraries.push(...currentUser.library);
      }
    }
    return libraries;
  };

  // ========================================================================================

  const updateLibrary = (libraryName: string, movieId: string) => {
    const usersJSON = localStorage.getItem("users");

    if (usersJSON) {
      let users: User[] = [];
      try {
        users = JSON.parse(usersJSON) as User[];
      } catch (error) {
        console.error("Error parsing users JSON:", error);
        return;
      }

      // Find the current user
      const currentUser = users.find((user: User) => user.email === email);
      if (!currentUser) {
        console.error("Current user not found");
        return;
      }

      // Update the library of the current user
      currentUser.library = currentUser.library.map((library) => {
        if (library.name === libraryName) {
          // Check if the movie ID already exists in the library
          if (library.movies.includes(movieId)) {
            console.warn("Movie already exists in the library");
            return library; // Return the library as is, without adding the movie again
          }
          // Otherwise, add the movie ID to the library
          return {
            ...library,
            movies: [...library.movies, movieId],
          };
        }
        return library;
      });

      // Find the index of the current user in the users array
      const userIndex = users.findIndex((user: User) => user.email === email);

      // Update the user's data in the array
      users[userIndex] = currentUser;

      // Save the updated users array back to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Also update the state to reflect the changes immediately
      setLibraries((prevLibraries) => {
        return prevLibraries.map((library) => {
          if (library.name === libraryName) {
            return {
              ...library,
              movies: [...library.movies, movieId],
            };
          }
          return library;
        });
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, email, login, logout, getLibraries, updateLibrary }}
    >
      {children}
    </AuthContext.Provider>
  );
};

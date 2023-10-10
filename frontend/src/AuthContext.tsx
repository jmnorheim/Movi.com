import { createContext, useContext, useState } from "react";

/**
 * Type; authentication context values.
 */
type AuthContextType = {
  isLoggedIn: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

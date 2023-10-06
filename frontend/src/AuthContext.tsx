import { createContext, useContext, useState } from "react";

/**
 * Type; authentication context values.
 */
type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

/**
 * Authentication context.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access the authentication context.
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
 * Type `AuthProvider` props.
 */
type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides authentication context to child components.
 * @param {AuthProviderProps} props - Props to be passed to component.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

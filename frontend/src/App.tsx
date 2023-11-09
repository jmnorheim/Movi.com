import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signal } from "@preact/signals-react";

import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { AuthProvider } from "./services/auth/AuthContext";
import { RequireAuth } from "./services/auth/RequireAuth";
import NavBar from "./components/Navbar/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";

// Signal that defines color of text in Navbar
export const navbarColor = signal("white");

/**
 * Render the App component.
 * @returns {React.Component}
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router basename="/project2">
          <NavBar textColor={navbarColor} />

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/my-library"
              element={
                <RequireAuth>
                  <MyLibraryPage />
                </RequireAuth>
              }
            />
            <Route
              path="/my-library/:libraryName"
              element={
                <RequireAuth>
                  <LibraryPage />
                </RequireAuth>
              }
            />
            {/* NotFound route */}
            <Route path="*" element={<div>404 Not found </div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;

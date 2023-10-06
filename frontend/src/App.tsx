import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyLibraryPage from "./pages/MyLibraryPage/MyLibraryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import Navbar from "./components/navbar/Navbar";
import { Container } from "@mui/material";

/**
 * Render the App component.
 * @returns {React.Component}
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <Router basename="/project2">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-library" element={<MyLibraryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>404 Not found </div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

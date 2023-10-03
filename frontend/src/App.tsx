import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import ProfilePage from './pages/ProfilePage';
import MyLibraryPage from './pages/MyLibraryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/**
 * Render the App component.
 * @returns {React.Component}
 */
const App: React.FC = () => {
  
  const someMovieId: string = "123"; // Just an example. Replace with actual logic.

  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        {/* Dynamically link to a specific movie by its ID */}
        <Link to={`/movie/${someMovieId}`}>Specific Movie</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/my-library">My Library</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
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
  );
}

export default App;

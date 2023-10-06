import MovieContainerGrid from "../../components/movieContainerGrid/MovieContainerGrid";
import "./HomePage.css";

/**
 * Render the HomePage component.
 * @returns {React.FC}
 */
const HomePage: React.FC = () => {
  return (
    <div className="HomePageContainer">
      <MovieContainerGrid />
    </div>
  );
};

export default HomePage;

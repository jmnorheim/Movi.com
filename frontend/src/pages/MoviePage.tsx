import { useParams } from 'react-router-dom';

/**
 * Render the MoviePage component.
 * @returns {React.Component}
 */
const MoviePage: React.FC = () => {
  const { movieId } = useParams();

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {movieId}</p>
    </div>
  );
};

export default MoviePage;

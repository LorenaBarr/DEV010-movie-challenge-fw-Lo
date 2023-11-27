
import PropTypes from 'prop-types'; // Importa PropTypes
import './MovieGrid.css';

// MovieCard
const MovieGrid = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
          <p>{movie.original_title}</p>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

//validación de PropTypes
MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieGrid;

import PropTypes from 'prop-types';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      {movie.poster_path && (
        <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
      )}
      <p>{movie.original_title}</p>
      <p>{movie.release_date}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
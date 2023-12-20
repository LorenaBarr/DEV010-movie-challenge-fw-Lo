import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const getYearFromDate = (dateString) => {
    // Utilizamos el método split para dividir la cadena de fecha en partes usando el carácter "-"
    const dateParts = dateString.split("-");
    // Tomamos el primer elemento del array resultante, que es el año
    return dateParts[0];
  };
  return (
    <div className="movie-card">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <p>{movie.original_title}</p>
      <p>{getYearFromDate(movie.release_date)}</p>
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

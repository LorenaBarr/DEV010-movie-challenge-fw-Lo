import MovieCard from "../MovieCard/MovieCard";
import PropTypes from "prop-types";
import "./MovieGrid.css";
//PropTypes es una biblioteca que se utiliza para definir y validar los tipos de las props.

const MovieGrid = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies &&
        Array.isArray(movies) &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};
//Se utiliza un operador lógico y un método de array para renderizar el componente.
//Array.isArray(movies): Se asegura de que movies sea un array antes de intentar renderizar.
//movies.map((movie) => <MovieCard key={movie.id} movie={movie} />): Itera sobre cada elemento del array movies y renderiza un componente MovieCard para cada película.
MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ),
};

export default MovieGrid;

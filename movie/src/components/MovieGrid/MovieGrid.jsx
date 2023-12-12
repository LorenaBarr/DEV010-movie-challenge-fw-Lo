import MovieCard from '../MovieCard/MovieCard';
import PropTypes from 'prop-types';
import './MovieGrid.css';
// Definimos el componente MovieGrid que muestra una cuadrícula de películas
// Recibimos como prop el array movies que contiene las películas a mostrar
const MovieGrid = ({ movies }) => {
  // Retornamos el JSX que representa la interfaz del componente MovieGrid
  // Creamos un div con la clase movie-grid que contiene la cuadrícula de películas
   // Recorremos el array movies con el método map para crear un componente MovieCard por cada película
    // Creamos un componente MovieCard para mostrar la información de la película
        // Usamos la prop key para asignar un identificador único al componente, usando el id de la película
        // Usamos la prop movie para pasar el objeto movie que contiene los datos de la película
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

MovieGrid.propTypes = {
   // movies es un array que contiene los objetos de las películas a mostrar
  // Cada objeto tiene las propiedades id, poster_path, original_title y release_date, todas de tipo requerido
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
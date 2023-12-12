
import PropTypes from 'prop-types';
import './MovieCard.css';

// Definimos el componente MovieCard que muestra una tarjeta con la información de una película
// Recibimos como prop el objeto movie que contiene los datos de la película
const MovieCard = ({ movie }) => {
   // Retornamos el JSX que representa la interfaz del componente MovieCard
    // Creamos un div con la clase movie-card que contiene la tarjeta de la película
    // Usamos una expresión condicional para renderizar una imagen solo si el objeto movie tiene la propiedad poster_path
    
      // Creamos un elemento img con el atributo src que contiene la url de la imagen de la película, usando una plantilla de cadena para concatenar la ruta base con el valor de movie.poster_path
      // Usamos el atributo alt para asignar un texto alternativo a la imagen, usando el valor de movie.title
      // // Creamos un elemento p que contiene el título original de la película, usando el valor de movie.original_title
      //// Creamos un elemento p que contiene la fecha de lanzamiento de la película, usando el valor de movie.release_date
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
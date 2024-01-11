import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  // Manejar el caso en que movie es undefined o movie.title no está definido
  if (!movie || !movie.title) {
    return null; // O puedes renderizar un mensaje de error u otra interfaz
  }
  //Se verifica si movie es undefined o si movie.title no está definido. En ese caso, el componente retorna null, lo que implica que no se renderizará nada. Esto maneja el caso cuando la información de la película no está disponible.
  const getYearFromDate = (dateString) => {
    // Utilizamos el método split para dividir la cadena de fecha en partes usando el carácter "-"
    //Se define una función getYearFromDate que toma una cadena de fecha y extrae el año utilizando el método split para dividir la cadena en partes.
    const dateParts = dateString.split("-");
    // Tomamos el primer elemento del array resultante, que es el año
    return dateParts[0];
  };
  //Se renderiza el componente con la clase CSS movie-card.
//{movie.poster_path && ...}: Renderiza un elemento <img> solo si movie.poster_path está presente en el objeto movie.
//Se muestran el título original de la película y el año de lanzamiento.
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

// Definimos el componente MovieSearch que permite buscar películas por género y ordenarlas por popularidad o fecha
import { useState, useEffect } from "react";
import "./MovieSearch.css";
import PropTypes from "prop-types";
//Se define el componente funcional MovieSearch que recibe las props: onGenreChange, onSortChange, onListChange, y onClear.
const MovieSearch = ({
  onGenreChange,
  onSortChange,
  onListChange,
  onClear,
}) => {
  const [selectedGenre, setSelectedGenre] = useState(1);
  const [selectedSort, setSelectedSort] = useState("popularity.desc");
//Se definen dos estados locales selectedGenre y selectedSort utilizando el hook useState.
  const handleGenreChange = (genreId) => {
    onGenreChange(genreId);
    setSelectedGenre(genreId);
  };
//Se ejecuta cuando cambia la selección del género. Llama a la función onGenreChange pasando el nuevo genreId y actualiza el estado local selectedGenre.
  const handleSortChange = (sortOption) => {
    onSortChange(sortOption);
    setSelectedSort(sortOption);
  };
//Se ejecuta cuando cambia la selección de ordenamiento. Llama a la función onSortChange pasando la nueva opción de ordenamiento y actualiza el estado local selectedSort.
  const handleClearFilters = () => {
    onClear(onListChange[0]);
    setSelectedGenre(onListChange[0]);
  };
//Se ejecuta al hacer clic en el botón "Limpiar Filtro". Llama a la función onClear pasando la primera opción de la lista de géneros y actualiza el estado local selectedGenre.
  // Retornamos el JSX que representa la interfaz del componente MovieSearch
  return (
    <div className="movie-search">
      {/* Dropdown para géneros */}
      <select
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        {onListChange.map((genre) => (
          <option key={genre.id} value={genre.id.toString()}>
            {genre.name}
          </option>
        ))}
      </select>
      {/* Botón para limpiar filtros */}
      <button onClick={handleClearFilters}>Limpiar Filtro</button>

      {/* Dropdown para ordenamiento */}
      <select
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="popularity.desc">Más popular</option>
        <option value="popularity.asc">Menos popular</option>
        <option value="release_date.desc">
          Fecha de lanzamiento (descendente)
        </option>
        <option value="release_date.asc">
          Fecha de lanzamiento (ascendente)
        </option>
        {/* Otras opciones de ordenamiento */}
      </select>
    </div>
  );
};
// Definimos las propiedades que recibe el componente MovieSearch
// y sus tipos con la librería PropTypes
MovieSearch.propTypes = {
  onGenreChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onListChange: PropTypes.array.isRequired,
  onClear: PropTypes.func.isRequired,

  
};

export default MovieSearch;

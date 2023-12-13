// Definimos el componente MovieSearch que permite buscar películas por género y ordenarlas por popularidad o fecha
import { useState, useEffect } from 'react';
import MovieApiRequests from '../../services/MovieApiRequests'
import './MovieSearch.css'
import PropTypes from 'prop-types';

// Recibimos como props las funciones onGenreChange, onMoviesChange y onSortChange que se encargan de actualizar
// el estado y los datos del componente padre App

const MovieSearch = ({ onGenreChange, onMoviesChange, onSortChange, currentPage }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  // Definimos el estado local del componente con los hooks useState
  // selectedGenre es una cadena que almacena el id del género seleccionado
  // setSelectedGenre es una función que permite actualizar el estado de selectedGenre
  const [selectedSort, setSelectedSort] = useState('popularity.desc');
   // selectedSort es una cadena que almacena la opción de ordenación seleccionada
  // setSelectedSort es una función que permite actualizar el estado de selectedSort
  const [genres, setGenres] = useState([]);
  // genres es un array que almacena las opciones de género disponibles
  // setGenres es una función que permite actualizar el estado de genres
  // const [movies, setMovies] = useState([]);
   // movies es un array que almacena las películas obtenidas de la API según el género y la ordenación seleccionados
  // setMovies es una función que permite actualizar el estado de movies
  //aunque este lo cambie por onMoviesChange
  // const [currentPage, setCurrentPage] = useState(1);
  // currentPage es un número que almacena la página actual de la paginación
  // setCurrentPage es una función que permite actualizar el estado de currentPage

  useEffect(() => {
     // Usamos el hook useEffect para ejecutar la función fetchData cuando se 
     //monta el componente o cuando cambian los valores de currentPage o selectedSort
     //// De esta forma, se obtienen los datos iniciales de la API y se actualizan 
     //según los criterios de búsqueda y ordenación
    const fetchData = async () => {
       // Definimos la función fetchData que se encarga de obtener 
       //los datos de la API de películas
      try {
        const genreOptions = await MovieApiRequests.fetchGenres();
         // Llamamos a la función fetchGenres del módulo MovieApiRequests
        // Esperamos a que se resuelva la promesa y guardamos el resultado 
        //en la variable genreOptions. 
         // Creamos un array con todas las opciones de género disponibles, añadiendo una opción vacía 
         //para indicar que se quieren ver todas las películas
        const allGenres = [{ id: '', name: 'Todo' }, ...genreOptions];
        setGenres(allGenres);
         // Actualizamos el estado de genres con el array de allGenres

        if (allGenres.length > 0) {
          // Si el array de allGenres tiene algún elemento, 
          //seleccionamos el primero como el género inicial
          setSelectedGenre(allGenres[0].id.toString());
           // Actualizamos el estado de selectedGenre con el id del 
           //primer elemento de allGenres, convertido a cadena
          const moviesData = await MovieApiRequests.fetchMoviesByGenre(allGenres[0].id, currentPage, selectedSort);
          onMoviesChange(moviesData.results);
           // Llamamos a la función fetchMoviesByGenre del módulo MovieApiRequests
          // Le pasamos como argumentos el id del primer elemento de allGenres, la opción de ordenación seleccionada y la página actual
          // Esperamos a que se resuelva la promesa y guardamos el resultado en la variable moviesData
           // Actualizamos el estado de movies con el array de resultados que viene en moviesData
            // Le pasamos como argumentos el id del género seleccionado, la opción de ordenación seleccionada y la página actual
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  // Ejecutamos la función fetchData
    fetchData();
  }, [currentPage, selectedSort]);
   // Indicamos que el efecto depende de los valores de currentPage y selectedSort

   // Definimos la función handleGenreChange que se encarga de manejar el cambio de género
  // Recibe como parámetro el id del género al que se quiere cambiar
  const handleGenreChange = async (genreId) => {
    try {
       // Llamamos a la función fetchMoviesByGenre del módulo MovieApiRequests
      const moviesData = await MovieApiRequests.fetchMoviesByGenre(genreId, selectedSort, currentPage);
       // Le pasamos como argumentos el id del género seleccionado, la opción de ordenación seleccionada y la página actual
      onMoviesChange(moviesData.results);
      // Esperamos a que se resuelva la promesa y guardamos el resultado en la variable moviesData
      // Actualizamos el estado de movies con el array de resultados que viene en moviesData
      onMoviesChange(moviesData.results);
      // Llamamos a la función onMoviesChange que viene como prop del componente padre App
      // Le pasamos como argumento el array de resultados que viene en moviesData
      // De esta forma, actualizamos el estado de movies del componente padre con el nuevo valor
      setSelectedGenre(genreId);
      // Actualizamos el estado de selectedGenre con el valor del parámetro

      if (genreId) {
        onGenreChange(genreId);
        // Si el parámetro genreId tiene algún valor, significa que se ha seleccionado un género específico
         // Llamamos a la función onGenreChange que viene como prop del componente padre App
        // Le pasamos como argumento el valor del parámetro
        // De esta forma, actualizamos el estado de selectedGenre del componente padre con el nuevo valor
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSortChange = async (sortOption) => {
  console.log(sortOption, "101");
    // Definimos la función handleSortChange que se encarga de manejar el cambio de ordenación
  // Recibe como parámetro la opción de ordenación que se quiere aplicar, se supone que sortOption el propm de la ordenacion
    try {
      const moviesData = await MovieApiRequests.fetchMoviesByGenre(selectedGenre, sortOption, currentPage);
      // Llamamos a la función fetchMoviesByGenre del módulo MovieApiRequests
      // Le pasamos como argumentos el id del género seleccionado, la opción de ordenación seleccionada y la página actual
      // Esperamos a que se resuelva la promesa y guardamos el resultado en la variable moviesData
      onMoviesChange(moviesData.results);
       // Actualizamos el estado de movies con el array de resultados que viene en moviesData, el problema debe estar en movie y setmovies, ya que se cambio a onMoviesChange
      setSelectedSort(sortOption);
       // Actualizamos el estado de selectedSort con el valor del parámetro
      onSortChange(sortOption);
      // Llamamos a la función onSortChange que viene como prop del componente padre App
      // Le pasamos como argumento el valor del parámetro
      // De esta forma, actualizamos el estado de sortOption del componente padre con el nuevo valor
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleClearFilters = async () => {
    // Definimos la función handleClearFilters que se encarga de limpiar los filtros de búsqueda
    try {
       // Llamamos a la función fetchMoviesByGenre del módulo MovieApiRequests
      // Le pasamos como argumentos una cadena vacía para indicar que no hay ningún género seleccionado, la opción de ordenación seleccionada y la página actual
      // Esperamos a que se resuelva la promesa y guardamos el resultado en la variable moviesData
      const moviesData = await MovieApiRequests.fetchMoviesByGenre('', selectedSort, currentPage);
      onMoviesChange(moviesData.results);
      // Actualizamos el estado de movies con el array de resultados que viene en moviesData
        // Actualizamos el estado de selectedGenre con una cadena vacía para indicar que no hay ningún género seleccionado
      setSelectedGenre('');
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Retornamos el JSX que representa la interfaz del componente MovieSearch
  return (
    <div className="movie-search">
      {/* Dropdown para géneros */}
      <select value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)}>
        {genres.map((genre) => (
          // Por cada elemento del array genres, creamos una opción en el dropdown 
          //con el id y el nombre del género
          <option key={genre.id} value={genre.id.toString()}>
            {genre.name}
          </option>
        ))}
      </select>
      {/* Botón para limpiar filtros */}
      <button onClick={handleClearFilters}>Limpiar Filtro</button>
  
      {/* Dropdown para ordenamiento */}
      <select value={selectedSort} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="popularity.desc">Más popular</option>
        <option value="popularity.asc">Menos popular</option>
        <option value="release_date.desc">Fecha de lanzamiento (descendente)</option>
        <option value="release_date.asc">Fecha de lanzamiento (ascendente)</option>
        {/* Otras opciones de ordenamiento */}
      </select>
  
      
    </div>
  );
};
// Definimos las propiedades que recibe el componente MovieSearch
// y sus tipos con la librería PropTypes
MovieSearch.propTypes = {
  onGenreChange: PropTypes.func.isRequired,
    // onGenreChange es una función que se encarga de actualizar el estado 
  //y los datos del componente padre App según el género seleccionado
  onMoviesChange: PropTypes.func.isRequired,
  // onMoviesChange es una función que se encarga de actualizar el estado y los datos del 
  //componente padre App según las películas obtenidas de la API
  onSortChange: PropTypes.func.isRequired,
  // onSortChange es una función que se encarga de actualizar el estado y los datos del 
  //componente padre App según la opción de ordenación seleccionada
  currentPage: PropTypes.number.isRequired
};

export default MovieSearch;
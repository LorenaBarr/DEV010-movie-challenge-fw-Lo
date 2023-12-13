import { useState, useEffect } from 'react';
//los hooks useState y useEffect de React para manejar el estado y los efectos de la aplicación
import MovieGrid from './components/MovieGrid/MovieGrid';
import Pagination from './components/MoviePages/Pagination';
import MovieSearch from './components/MovieSearch/MovieSearch';
import MovieApiRequests from './services/MovieApiRequests'
import './App.css';

// Definimos el componente App que representa la aplicación principal
function App() {
  // Definimos el estado de la aplicación con los hooks useState
  // movies es un array que contiene las películas obtenidas de la API
  // setMovies es una función que permite actualizar el estado de movies
  const [movies, setMovies] = useState([]);
  // currentPage es un número que indica la página actual de la paginación
  // setCurrentPage es una función que permite actualizar el estado de currentPage
  const [currentPage, setCurrentPage] = useState(1);
   // totalPages es un número que indica el total de páginas de la paginación
  // setTotalPages es una función que permite actualizar el estado de totalPages
  const [totalPages, setTotalPages] = useState(1);
   // selectedGenre es un número que indica el género seleccionado para filtrar las películas
  // setSelectedGenre es una función que permite actualizar el estado de selectedGenre
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState('popularity.desc');
  // sortOption es una cadena que indica la opción de ordenación de las películas
  // setSortOption es una función que permite actualizar el estado de sortOption
 
  const fetchData = async (genre, page, sort) => {
    // Definimos la función fetchData que se encarga de obtener los datos de la API de películas
  // Recibe como parámetros la página, el género y la opción de ordenación
    try {
      const data = await MovieApiRequests.fetchMoviesByGenre(genre, page, sort);
      // Llamamos a la función fetchMoviesByGenre del módulo MovieApiRequests
      // Le pasamos como argumentos el género, la página y la opción de ordenación
      // Esperamos a que se resuelva la promesa y guardamos el resultado en la variable data
      setMovies(data.results);
       // Actualizamos el estado de movies con el array de resultados que viene en data
      setTotalPages(data.totalPages);
       // Actualizamos el estado de totalPages con el número de páginas que viene en data
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handlePageChange = (page) => {
     // Definimos la función handlePageChange que se encarga de manejar el cambio de página
  // Recibe como parámetro la página a la que se quiere cambiar
    setCurrentPage(page);
    // Actualizamos el estado de currentPage con el valor del parámetro
  };

  const handleGenreChange = (genreId) => {
     // Definimos la función handleGenreChange que se encarga de manejar el cambio de género
  // Recibe como parámetro el id del género al que se quiere cambiar
    setCurrentPage(1);
    // Actualizamos el estado de currentPage a 1, ya que al cambiar de género se reinicia la paginación
     // Actualizamos el estado de selectedGenre con el valor del parámetro
    setSelectedGenre(genreId);
  };

  const handleSortChange = (sortOption) => {
    // Definimos la función handleSortChange que se encarga de manejar el cambio de ordenación
  // Recibe como parámetro la opción de ordenación que se quiere aplicar
    setSortOption(sortOption);
     // Actualizamos el estado de sortOption con el valor del parámetro
  };

  useEffect(() => {
    console.log(currentPage, selectedGenre, sortOption, "useEffect1");
    // Usamos el hook useEffect para ejecutar la función fetchData cada vez que cambien los valores de currentPage, selectedGenre o sortOption
  // De esta forma, se actualizan los datos de la API según los criterios de búsqueda y ordenación
    fetchData(selectedGenre, sortOption, currentPage);
  }, [selectedGenre, sortOption, currentPage]);

  // Retornamos el JSX que representa la interfaz de la aplicación
  return (
    <div>
      <h1>Movies</h1>
      <MovieSearch
        onGenreChange={handleGenreChange}
        // Pasamos la función handleGenreChange como prop al componente MovieSearch
        onMoviesChange={setMovies}  
         // Pasamos la función setMovies como prop al componente MovieSearch
        onSortChange={handleSortChange}
        currentPage={currentPage}
        // Pasamos la función handleSortChange como prop al componente MovieSearch
        // Pasamos el estado movies como prop al componente MovieGrid
      /> 
      <MovieGrid movies={movies}  /> 
      
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
    // Pasamos los estados currentPage y totalPages y la función handlePageChange como props al componente Pagination
  );
}

export default App;
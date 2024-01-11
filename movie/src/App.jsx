import { useState, useEffect } from "react";

//los hooks useState y useEffect de React para manejar el estado y los efectos de la aplicación
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Pagination from "./components/MoviePages/Pagination";
import MovieSearch from "./components/MovieSearch/MovieSearch";
import MovieApiRequests from "./services/MovieApiRequests";
import "./App.css";

function App() {
  //Declaración de Estados con useState
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("popularity.desc");
  const [list, setList] = useState([]);

  //Definición de Función Asíncrona para Obtener Lista de Géneros
  async function getGenresList() {
    const genreOptions = await MovieApiRequests.fetchGenres();

    const allGenres = [{ id: "", name: "Todo" }, ...genreOptions];
    setList(allGenres);
    setTotalPages(allGenres.totalPages);
  }
  //Definición de Función Asíncrona para Obtener Películas
  async function fetchData(genreId, sortOption, page) {
    try {
      const data = await MovieApiRequests.fetchMovies(
        genreId,
        sortOption,
        page
      );
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
//Manejo de Cambios de Género, Orden y Página
//funciones de manjeo de eventos y se actualizan al estado
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    fetchData(selectedGenre, sortOption, currentPage);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
    fetchData(selectedGenre, sortOption);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(selectedGenre, sortOption, page);
  };

  const handleClear = (genreId) => {
    setSelectedGenre(genreId);
    fetchData(selectedGenre, sortOption, currentPage);
  };
//Efecto Secundario con useEffect
//Se utiliza el hook useEffect para ejecutar las funciones fetchData y getGenresList cuando cambian los estados de selectedGenre, sortOption o currentPage. Esto simula el ciclo de vida 
  useEffect(() => {
    fetchData(selectedGenre, sortOption, currentPage);
    getGenresList();
    
  }, [selectedGenre, sortOption, currentPage]);

  //Renderización del Componente
  return (
    <div>
      <h1>Movies</h1>
      <MovieSearch
        onGenreChange={handleGenreChange}
        onClear={handleClear}
        onSortChange={handleSortChange}
        onListChange={list}
      />
      <MovieGrid movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
//onGenreChange, onClear, onSortChange, y onListChange son propiedades (props) que se están pasando al componente MovieSearch. Las props son utilizadas para pasar datos y funciones entre componentes en React.
export default App;

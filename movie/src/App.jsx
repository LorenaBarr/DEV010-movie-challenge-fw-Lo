import { useState, useEffect } from "react";
//los hooks useState y useEffect de React para manejar el estado y los efectos de la aplicación
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Pagination from "./components/MoviePages/Pagination";
import MovieSearch from "./components/MovieSearch/MovieSearch";
import MovieApiRequests from "./services/MovieApiRequests";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("popularity.desc");
  const [list, setList] = useState([]);

  async function getGenresList() {
    const genreOptions = await MovieApiRequests.fetchGenres();
    console.log(genreOptions);

    const allGenres = [{ id: "", name: "Todo" }, ...genreOptions];
    setList(allGenres);

    
  }

  async function fetchData(genreId, sortOption, page) {
    console.log(genreId);
    const data = await MovieApiRequests.fetchMovies(genreId, sortOption, page);
    setMovies(data.results);
    console.log(data);
    //hacer el try
  }

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    fetchData(selectedGenre, sortOption, 1);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
    fetchData(selectedGenre, sortOption, 1);
  };

  

  const handleClear = (genreId) => {
    setSelectedGenre(genreId);
    fetchData(selectedGenre, sortOption, 1);
  };

  useEffect(() => {
    fetchData(selectedGenre, sortOption, 1);
    getGenresList();
    // fetchData(selectedGenre, sortOption, currentPage);
  }, [selectedGenre, sortOption]);

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

      {/* <Pagination  /> */}
    </div>
    // Pasamos los estados currentPage y totalPages y la función handlePageChange como props al componente Pagination
  );
}

export default App;

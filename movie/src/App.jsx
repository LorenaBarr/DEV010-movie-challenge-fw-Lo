import { useState, useEffect } from "react";
//los hooks useState y useEffect de React para manejar el estado y los efectos de la aplicación
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Pagination from "./components/MoviePages/Pagination";
import MovieSearch from "./components/MovieSearch/MovieSearch";
import MovieApiRequests from "./services/MovieApiRequests";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("popularity.desc");
  const [list, setList] = useState([]);

  async function getGenresList() {
    const genreOptions = await MovieApiRequests.fetchGenres();

    const allGenres = [{ id: "", name: "Todo" }, ...genreOptions];
    setList(allGenres);
    setTotalPages(allGenres.totalPages);
  }

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

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    fetchData(selectedGenre, sortOption, 1);
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

  useEffect(() => {
    fetchData(selectedGenre, sortOption, currentPage);
    getGenresList();
    // fetchData(selectedGenre, sortOption, currentPage);
  }, [selectedGenre, sortOption, currentPage]);

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

export default App;

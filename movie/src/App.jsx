import { useState, useEffect } from 'react';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Pagination from './components/MoviePages/Pagination';
import MovieSearch from './components/MovieSearch/MovieSearch';
import MovieApiRequests from './services/MovieApiRequests'
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState('popularity.desc');

  const fetchData = async (page, genre, sort) => {
    try {
      const data = await MovieApiRequests.fetchMoviesByGenre(genre, page, sort);
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreChange = (genreId) => {
    setCurrentPage(1);
    setSelectedGenre(genreId);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  useEffect(() => {
    fetchData(currentPage, selectedGenre, sortOption);
  }, [currentPage, selectedGenre, sortOption]);

  return (
    <div>
      <h1>Movies</h1>
      <MovieSearch
        onGenreChange={handleGenreChange}
        onMoviesChange={setMovies}  // Cambiado para simplificar
        onSortChange={handleSortChange}
      />
      <MovieGrid movies={movies}  />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
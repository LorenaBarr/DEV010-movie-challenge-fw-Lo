import { useState, useEffect } from 'react';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Pagination from './components/MoviePages/Pagination';
import MovieSearch from './components/MovieSearch/MovieSearch';
import MovieApiRequests from './services/MovieApiRequests';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MovieApiRequests.fetchMovies({
          page: currentPage,
        });
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <h1>Movies</h1>
      <MovieSearch />
      <MovieGrid movies={movies} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
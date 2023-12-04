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
        // Ahora usamos la función fetchMoviesByGenre que toma un genreId como parámetro
        const genreId = 16; // Puedes cambiar esto según el género seleccionado
        const data = await MovieApiRequests.fetchMoviesByGenre(genreId, currentPage);

        setMovies(data);
        // La información de paginación puede variar según la API, ajusta según sea necesario
        setTotalPages(data.length > 0 ? Math.ceil(data.length / 20) : 1);
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
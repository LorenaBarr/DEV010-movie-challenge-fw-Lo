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
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page);
  };

  const handleGenreChange = (genreId) => {
    // Cuando se selecciona un género, reiniciamos la página a 1 y actualizamos el género seleccionado
    setCurrentPage(1);
    setSelectedGenre(genreId);

  };

  const handleMovieChange = (moviesFromSearch) => {
    if (moviesFromSearch && moviesFromSearch.length ) {
      setMovies(moviesFromSearch)

    }
    
  
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreId = ''; // O el género que desees, o deja vacío para obtener todas las películas
        const data = await MovieApiRequests.fetchMoviesByGenre(genreId, currentPage);
  
        setMovies(data.results);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
  
    fetchData();
  }, [currentPage]);
  
  return (
    <div>
      <h1>Movies</h1>
      <MovieSearch onGenreChange={handleGenreChange} onMoviesChange={handleMovieChange} />
      <MovieGrid movies={movies}  />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}


export default App;
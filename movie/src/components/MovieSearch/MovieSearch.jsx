import  { useState, useEffect } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieApiRequests from '../../services/MovieApiRequests';
import './MovieSearch.css';
import PropTypes from 'prop-types';

const MovieSearch = ({ onGenreChange, onMoviesChange }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreOptions = await MovieApiRequests.fetchGenres();
        const allGenres = [{ id: '', name: 'Todo' }, ...genreOptions];
        setGenres(allGenres);

        if (allGenres.length > 0) {
          setSelectedGenre(allGenres[0].id.toString());
          const moviesData = await MovieApiRequests.fetchMoviesByGenre(allGenres[0].id, selectedSort);
          setMovies(moviesData.results);
          
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedSort]);

  const handleGenreChange = async (genreId) => {
    console.log(genreId);
    try {
      const moviesData = await MovieApiRequests.fetchMoviesByGenre(genreId, selectedSort);
      setMovies(moviesData.results);
      onMoviesChange(moviesData.results)
      console.log(moviesData);
      setSelectedGenre(genreId);

      // Se llama a la función proporcionada desde las propiedades para notificar a App.jsx del cambio de género
      if (genreId) {
        onGenreChange(genreId);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSortChange = async (sortOption) => {
    try {
      const moviesData = await MovieApiRequests.fetchMoviesByGenre(selectedGenre, sortOption);
      setMovies(moviesData.results);
      setSelectedSort(sortOption);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleClearFilters = async () => {
    try {
      const moviesData = await MovieApiRequests.fetchMoviesByGenre('', selectedSort);
      setMovies(moviesData.results);
      setSelectedGenre('');
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="movie-search">
      {/* Dropdown para géneros */}
      <select value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)}>
        {genres.map((genre) => (
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

      {/* Resultados de películas */}
      {/* <MovieGrid movies={movies} /> */}
    </div>
  );
};

MovieSearch.propTypes = {
  onGenreChange: PropTypes.func.isRequired,
};

export default MovieSearch;
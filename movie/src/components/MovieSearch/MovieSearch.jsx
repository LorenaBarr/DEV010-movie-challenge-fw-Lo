import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MovieApiRequests from '../services/MovieApiRequests';
import MovieGrid from '../MovieGrid/MovieGrid'

const MovieSearch = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { genres: genreOptions, movies: moviesData } = await MovieApiRequests.fetchMovies();

        setGenres([{ id: '', name: 'Todo' }, ...genreOptions]);
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenreChange = async (genreId) => {
    try {
      const { movies: moviesData } = await MovieApiRequests.fetchMoviesByGenre(genreId, selectedSort);
      setMovies(moviesData);
      setSelectedGenre(genreId);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSortChange = async (sortOption) => {
    try {
      const { movies: moviesData } = await MovieApiRequests.fetchMoviesByGenre(selectedGenre, sortOption);
      setMovies(moviesData);
      setSelectedSort(sortOption);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleClearFilters = async () => {
    try {
      const { movies: moviesData } = await MovieApiRequests.fetchMoviesByGenre('', selectedSort);
      setMovies(moviesData);
      setSelectedGenre('');
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="movie-search">
      <select value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)}>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id.toString()}>
            {genre.name}
          </option>
        ))}
      </select>

      <button onClick={handleClearFilters}>Limpiar Filtro</button>

      <select value={selectedSort} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="popularity.desc">Más popular</option>
        <option value="popularity.asc">Menos popular</option>
        <option value="release_date.desc">Fecha de lanzamiento (descendente)</option>
        <option value="release_date.asc">Fecha de lanzamiento (ascendente)</option>
      </select>

      <MovieGrid movies={movies} />
    </div>
  );
};

MovieSearch.propTypes = {
  onGenreChange: PropTypes.func.isRequired,
};

export default MovieSearch;
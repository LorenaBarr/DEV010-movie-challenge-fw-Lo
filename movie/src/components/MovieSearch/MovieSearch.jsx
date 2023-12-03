import { useState, useEffect } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieApiRequests from '../../services/MovieApiRequests';
import './MovieSearch.css';

const MovieSearch = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          with_genres: '16', // ID del género de animación
          with_original_language: selectedLanguage,
          primary_release_year: selectedYear,
          region: selectedCountry,
          sort_by: sortBy,
        };

        const data = await MovieApiRequests.fetchMovies(options);
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [selectedLanguage, selectedCountry, selectedYear, sortBy]);

  return (
    <div className="movie-search">
      {/* Dropdown para idiomas */}
      <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="">Seleccionar idioma</option>
        {/* Agrega opciones de idiomas si es necesario */}
      </select>

      {/* Dropdown para años */}
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Seleccionar año</option>
        {/* Agrega opciones de años si es necesario */}
      </select>

      {/* Dropdown para países */}
      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Seleccionar país</option>
        {/* Agrega opciones de países si es necesario */}
      </select>

      {/* Dropdown para ordenamiento */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="popularity.desc">Más popular</option>
        <option value="popularity.asc">Menos popular</option>
        <option value="release_date.desc">Fecha de lanzamiento (descendente)</option>
        <option value="release_date.asc">Fecha de lanzamiento (ascendente)</option>
        <option value="original_title.asc">Título (A-Z)</option>
        <option value="original_title.desc">Título (Z-A)</option>
        {/* Otras opciones de ordenamiento */}
      </select>

      {/* Resultados de películas */}
      <MovieGrid movies={movies} />
    </div>
  );
};

export default MovieSearch;
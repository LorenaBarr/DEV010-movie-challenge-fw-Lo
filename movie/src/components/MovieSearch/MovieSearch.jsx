import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieGrid from '../MovieGrid/MovieGrid';
import './MovieSearch.css';

const MovieSearch = () => {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [releaseYears, setReleaseYears] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Función para obtener opciones de filtrado y ordenamiento
    const fetchFilterOptions = async () => {
      try {
        // Obtener géneros, lenguajes, años, etc. de la API y establecer los estados correspondientes
        const apiKey = 'c122c849039f792fd480b3e7aef4721f';
        const [genresResponse, languagesResponse, yearsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`),
          axios.get('https://api.themoviedb.org/3/configuration/languages'),
          axios.get('https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=2022'),
        ]);

        setGenres(genresResponse.data.genres);
        setLanguages(languagesResponse.data);
        setReleaseYears(yearsResponse.data.results.map((year) => year.release_date.split('-')[0]));
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []); // Se ejecuta una vez al montar el componente

  useEffect(() => {
    // Función para obtener películas según los filtros y orden seleccionados
    const fetchMovies = async () => {
      try {
        const apiKey = 'c122c849039f792fd480b3e7aef4721f';
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&with_original_language=${selectedLanguage}&primary_release_year=${selectedYear}&sort_by=${sortBy}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Solo ejecutar la búsqueda si se han seleccionado género, idioma o año
    if (selectedGenre || selectedLanguage || selectedYear) {
      fetchMovies();
    }
  }, [selectedGenre, selectedLanguage, selectedYear, sortBy]);

  return (
    <div className="movie-search">
      {/* Dropdown para géneros */}
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">Seleccionar género</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Dropdown para idiomas */}
      <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="">Seleccionar idioma</option>
        {languages.map((language) => (
          <option key={language.iso_639_1} value={language.iso_639_1}>
            {language.english_name}
          </option>
        ))}
      </select>

      {/* Dropdown para años */}
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Seleccionar año</option>
        {releaseYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
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
import { useState, useEffect } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieApiRequests from '../../services/MovieApiRequests';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const moviesData = await MovieApiRequests.fetchMovies();
        setMovies(moviesData.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default MovieList;
import { useEffect, useState } from 'react';
import MovieApiRequests from '../services/MovieApiRequests';
import MovieGrid from './MovieGrid';


const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        await MovieApiRequests.fetchMovies({
          page: 1,
          onSuccess: ({ movies: fetchedMovies }) => {
            setMovies(fetchedMovies);
          },
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      }
    };

    fetchMoviesData();
  }, []);

  return (
    <div>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default MovieList;
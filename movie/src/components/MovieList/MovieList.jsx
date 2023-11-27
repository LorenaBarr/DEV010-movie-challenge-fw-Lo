import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieGrid from '../MovieGrid/MovieGrid';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'c122c849039f792fd480b3e7aef4721f';
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
        );
        setMovies(response.data.results || []);
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
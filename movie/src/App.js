import React, { useState, useEffect } from 'react';
import MovieGrid from '../src/components/MovieGrid/MoviGrid'

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'c122c849039f792fd480b3e7aef4721f';
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return (
    <div>
      <h1>Movies</h1>
      <MovieGrid movies={movies} />
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next Page</button>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import MovieGrid from '../src/components/MovieGrid/MovieGrid';
import Pagination from '../src/components/Pages/Pagination'; // Asegúrate de tener la ruta correcta

import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'c122c849039f792fd480b3e7aef4721f';
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Movies</h1>
      <MovieGrid movies={movies} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
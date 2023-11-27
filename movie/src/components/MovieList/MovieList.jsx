import  { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pages/Pagination';
//MovieHome 
const MovieList = () => {
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
// Ubicar este en otro componenete, movieGrid
  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
            <p>{movie.original_title}</p>
            <p>{movie.release_date}</p>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default MovieList;
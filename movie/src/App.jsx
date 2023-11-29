import { useState, useEffect } from 'react';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Pagination from './components/MoviePages/Pagination';
import MovieSearch from './components/MovieSearch/MovieSearch';
import axios from 'axios';
import './App.css';

const fetchMovies = async (options ) => {
  try {
    const apiKey = 'c122c849039f792fd480b3e7aef4721f';
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&page=${options.page}`
    );
    options.onSuccess(response.data)
  
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const options  = {
    page: currentPage, 
    onSuccess: (data) =>{
      setMovies(data.results);
    setTotalPages(data.total_pages);
    }
    }

    fetchMovies(options);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Movies</h1>
      <MovieSearch />
      <MovieGrid movies={movies} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}


export default App;
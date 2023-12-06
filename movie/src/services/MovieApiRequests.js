import axios from 'axios';

const apiKey = 'c122c849039f792fd480b3e7aef4721f';



const fetchMovies = async (options) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${options.page}`
    );
    
    const genresResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const genresData = genresResponse.data.genres || [];

    options.onSuccess({
      movies: response.data.results || [],
      totalPages: response.data.total_pages || 1,
      genres: genresData,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

export default { fetchMovies };
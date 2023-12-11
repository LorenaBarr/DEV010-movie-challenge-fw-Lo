import axios from 'axios';

const apiKey = 'c122c849039f792fd480b3e7aef4721f';

const fetchMoviesByGenre = async (genreId, sortOption, page) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
    );

    return {
      results: response.data.results || [],
      totalPages: response.data.total_pages || 1,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

const fetchGenres = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    return response.data.genres || [];
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export default { fetchMoviesByGenre, fetchGenres };
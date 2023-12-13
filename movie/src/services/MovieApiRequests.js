import axios from 'axios';

const apiKey = 'c122c849039f792fd480b3e7aef4721f';

const fetchMovies = async (genreId, sortOption, page) => {

  // console.log(genreId, sortOption, page)
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&sort_by=${sortOption}`
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
    console.log(response);
    return response.data.genres || [];
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export default { fetchMovies, fetchGenres };
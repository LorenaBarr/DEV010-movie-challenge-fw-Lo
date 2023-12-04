import axios from 'axios';

const apiKey = 'c122c849039f792fd480b3e7aef4721f';

const fetchMoviesByGenre = async (genreId, sortOption) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=${sortOption}`
    );
    return response.data.results || [];
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

// const MovieApiRequests = {
//   fetchMovies: async (options) => {
//     try {
//       const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
//         params: {
//           api_key: apiKey,
//           ...options,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//       throw error;
//     }
//   },

export default {
  fetchMoviesByGenre,
  fetchGenres,
};

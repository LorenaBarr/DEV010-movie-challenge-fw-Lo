// MovieApiRequests.js

import axios from 'axios';

const apiKey = 'c122c849039f792fd480b3e7aef4721f';

const MovieApiRequests = {
  fetchMovies: async (options) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: apiKey,
          ...options,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },
  
  fetchMoviesByGenre: async (genreId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
      );
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },
  fetchMoviesByCountry: async (countryCode) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=${countryCode}`
      );
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },// Otros métodos relacionados con la API de películas
};

export default MovieApiRequests;

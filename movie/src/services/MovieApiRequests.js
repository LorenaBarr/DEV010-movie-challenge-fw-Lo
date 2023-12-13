import axios from 'axios';

const apiKey = 'c122c849039f792fd480b3e7aef4721f';
// Definimos una constante apiKey que almacena la clave de la API de películas que vamos a usar
// Definimos la función fetchMoviesByGenre que se encarga de obtener las películas de la API según el género, la opción de ordenación y la página
// Recibe como parámetros el id del género, la opción de ordenación y el número de página
// aca pongo page, pero lo cambie
const fetchMoviesByGenre = async (genreId, sortOption, page) => {
  console.log("9", sortOption)
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&sort_by=${sortOption}`
    );
    // Usamos la función axios.get para hacer una petición GET a la API de películas
    // Le pasamos como argumento la url de la API, usando una plantilla de cadena 
    //para concatenar la clave de la API, el id del género y el número de página
    return {
      // Retornamos un objeto con dos propiedades: results y totalPages
      // results es un array que contiene las películas obtenidas de la API o un array vacío si no hay resultados
      // totalPages es un número que indica el total de páginas disponibles para la consulta o 1 si no hay datos
      results: response.data.results || [],
      totalPages: response.data.total_pages || 1,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// // Definimos la función fetchGenres que se encarga de obtener los géneros de la API
// const fetchGenres = async () => {
//   try {
//     const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
//     return response.data.genres || [];
//   } catch (error) {
//     console.error('Error fetching genres:', error);
//     throw error;
//   }
// };

export default { fetchMoviesByGenre };
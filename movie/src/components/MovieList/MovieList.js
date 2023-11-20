import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
  // Estado para almacenar la lista de películas
  const [movies, setMovies] = useState([]);

  // Estado para realizar un seguimiento de la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Efecto que se ejecuta cuando cambia la página actual
  useEffect(() => {
    // Función asincrónica para obtener las películas
    const fetchMovies = async () => {
      try {
        // Clave de API para la solicitud a The Movie Database (TMDb)
        const apiKey = 'c122c849039f792fd480b3e7aef4721f';

        // Realiza una solicitud GET a la API de TMDb para obtener las películas de la página actual
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`
        );

        // Actualiza el estado con la lista de películas obtenida de la respuesta
        setMovies(response.data.results);
      } catch (error) {
        // Manejo de errores: muestra un mensaje en la consola si hay un error al obtener películas
        console.error('Error fetching movies:', error);
      }
    };

    // Llama a la función para obtener películas cuando cambia la página actual
    fetchMovies();
  }, [currentPage]); // Dependencia: vuelve a ejecutarse cuando cambia la página actual

  // Renderiza el componente MovieList
  return (
    <div>
      <h1>Movies</h1>
      {/* Lista de películas */}
      <ul>
        {movies.map((movie) => (
          // Elemento de lista para cada película
          <li key={movie.id}>
            {/* Imagen de la película */}
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
            {/* Título original de la película */}
            <p>{movie.original_title}</p>
            {/* Fecha de lanzamiento de la película */}
            <p>{movie.release_date}</p>
          </li>
        ))}
      </ul>
      {/* Botón para cargar la siguiente página de películas */}
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next Page</button>
    </div>
  );
};

// Exporta el componente MovieList
export default MovieList;
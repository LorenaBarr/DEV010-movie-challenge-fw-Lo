import { render, screen } from '@testing-library/react';
import { mockAxios } from '../utils/testUtils';
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';

// Simula el módulo 'axios' para que las llamadas a axios sean manejadas por Jest.
jest.mock('axios');
// Prueba que renderiza la lista de películas.
test('renders movie list', async () => {
  // Simula una llamada a la API utilizando una función mockAxios, proporcionando datos simulados
  mockAxios({
    results: [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ],
  });
  // Renderiza el componente MovieList en un entorno de prueba.
  render(<MovieList />);
  // Busca en la pantalla los elementos que contienen los textos 'Movie 1' y 'Movie 2'.
  const movie1 = await screen.findByText('Movie 1');
  const movie2 = await screen.findByText('Movie 2');
  // Asegura que los elementos con los textos 'Movie 1' y 'Movie 2' estén presentes en la pantalla.
  expect(movie1).toBeInTheDocument();
  expect(movie2).toBeInTheDocument();
  // Asegura que la función axios haya sido llamada con la URL correcta al realizar la solicitud.
  expect(axios).toHaveBeenCalledWith({
    method: 'get',
    url: 'https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}',
  });
});



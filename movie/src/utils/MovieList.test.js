import { render, screen, waitFor } from '@testing-library/react';
// //render: permite renderizar un componente de React en un entorno de prueba.
// screen: permite acceder a los elementos del componente renderizado mediante consultas como getByText o getByTestId.
// waitFor: permite esperar a que se cumpla una condición asincrónica antes de continuar con el test. //
// eslint-disable-next-line no-unused-vars
import userEvent from '@testing-library/user-event';
// permite simular eventos de usuario como clicks o entradas de texto.
import MovieList from '../components/MovieList/MovieList';
import MovieApiRequests from '../../src/services/MovieApiRequests';

jest.mock('../../src/services/MovieApiRequests', () => ({
  fetchMovies: jest.fn(),
}));
 //crea un mock del módulo MovieApiRequests, es decir, una versión simulada que se usa en lugar del original. 
 //Esto se hace para evitar hacer llamadas reales a la API y poder controlar el resultado que se devuelve.
 // se crea un mock de la función fetchMovies que devuelve una función vacía de jest.

const mockMovies = [
  { id: 1, poster_path: '/path1.jpg', original_title: 'Movie 1', release_date: '2023-01-01' },
  { id: 2, poster_path: '/path2.jpg', original_title: 'Movie 2', release_date: '2023-01-02' },
];

// declara una constante que contiene un array de objetos que representan las películas 
//que se van a usar en el test. 
describe('MovieList', () => {
  it('renders MovieList component with movies', async () => {
   //el componente MovieList se renderiza con las películas.
    MovieApiRequests.fetchMovies.mockResolvedValueOnce({ results: mockMovies });
//el método mockResolvedValueOnce de jest para hacer que la función fetchMovies devuelva 
//una promesa resuelta con el objeto { results: mockMovies } 
//la primera vez que se llame. De esta forma, se simula el resultado de la llamada a 
//la API con los datos que se han definido previamente.
    // Renderiza el componente MovieList
    render(<MovieList />);

    // 
    expect(MovieApiRequests.fetchMovies).toHaveBeenCalledTimes(1);
//la función expect de jest para hacer una afirmación sobre el comportamiento esperado del código. 
//se espera que la función fetchMovies se haya llamado una vez, 
//lo que se comprueba con el método toHaveBeenCalledTimes de jest.
    // Espera a que la llamada asincrónica se complete
    await waitFor(() => {
      // para esperar a que se cumpla una condición asincrónica antes de continuar con el test.
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
    //se espera que el elemento que tiene el texto ‘Movie 1’ 
    //esté en el documento, lo que se comprueba con el método toBeInTheDocument 
    //de @testing-library/jest-dom.
  });

  
});

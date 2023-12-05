import { render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import userEvent from '@testing-library/user-event';
import MovieList from '../components/MovieList/MovieList';
import MovieApiRequests from '../../src/services/MovieApiRequests';

// Configura el mock para fetchMovies
jest.mock('../../src/services/MovieApiRequests', () => ({
  fetchMovies: jest.fn(),
}));

const mockMovies = [
  { id: 1, poster_path: '/path1.jpg', original_title: 'Movie 1', release_date: '2023-01-01' },
  { id: 2, poster_path: '/path2.jpg', original_title: 'Movie 2', release_date: '2023-01-02' },
];

describe('MovieList', () => {
  it('renders MovieList component with movies', async () => {
    // Configura el mock para fetchMovies
    MovieApiRequests.fetchMovies.mockResolvedValueOnce({ results: mockMovies });

    // Renderiza el componente MovieList
    render(<MovieList />);

    // Asegúrate de que se está llamando a fetchMovies
    expect(MovieApiRequests.fetchMovies).toHaveBeenCalledTimes(1);

    // Espera a que la llamada asincrónica se complete
    await waitFor(() => {
      // Asegúrate de que se renderizan las tarjetas de películas
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  // Agrega más pruebas según sea necesario
});

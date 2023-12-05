

import { render, screen, fireEvent, act } from '@testing-library/react';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import MovieApiRequests from '../../src/services/MovieApiRequests';

jest.mock('../../src/services/MovieApiRequests');

const mockGenres = [
  { id: 1, name: 'Todo' },
  { id: 2, name: 'Genre 2' },
 
];

describe('MovieSearch', () => {
  it('renders movie search component correctly', async () => {
    await act(async () => {
      MovieApiRequests.fetchGenres.mockResolvedValueOnce(mockGenres);

      render(<MovieSearch />);

      
      expect(screen.getByText('Todo')).toBeInTheDocument();
      expect(screen.getByText('Genre 2')).toBeInTheDocument();

      // Verifica que las películas se rendericen correctamente
      // (Asegúrate de ajustar según tus necesidades)
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  it('calls fetchMoviesByGenre when a genre is selected', async () => {
    await act(async () => {
      // Configura el mock para fetchGenres y fetchMoviesByGenre
      MovieApiRequests.fetchGenres.mockResolvedValueOnce(mockGenres);
      MovieApiRequests.fetchMoviesByGenre.mockResolvedValueOnce([]);

      render(<MovieSearch />);

      // Selecciona un género en el dropdown
      fireEvent.change(screen.getByLabelText('Todo'), { target: { value: '1' } });

      // Verifica que fetchMoviesByGenre se llame correctamente
      expect(MovieApiRequests.fetchMoviesByGenre).toHaveBeenCalledWith('1', 'popularity.desc');
    });
  });
});

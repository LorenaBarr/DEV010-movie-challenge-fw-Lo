
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import MovieApiRequests from '../../src/services/MovieApiRequests';

jest.mock('../../src/services/MovieApiRequests');

const mockFunctions = {
  onGenreChange: jest.fn(),
  onSortChange: jest.fn(),
  onListChange: [],
  onClear: jest.fn(),
};
const mockGenres = [
  { id: 1, name: 'Todo' },
  { id: 2, name: 'Genre 2' },
];

describe('MovieSearch', () => {
  it('renders movie search component correctly', async () => {
    act(() => {
      MovieApiRequests.fetchGenres.mockResolvedValueOnce(mockGenres);

      render(
        <MovieSearch
          onGenreChange={mockFunctions.onGenreChange}
          onSortChange={mockFunctions.onSortChange}
          onListChange={mockFunctions.onListChange}
          onClear={mockFunctions.onClear}
        />
      );
    });

    // Espera a que los elementos estén presentes
    expect(await screen.findByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('Genre 2')).toBeInTheDocument();

    // Verifica que las películas se rendericen correctamente
    // (Asegúrate de ajustar según tus necesidades)
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('calls fetchGenres when a genre is selected', async () => {
    act(() => {
      // Configura el mock para fetchGenres y fetchMoviesByGenre
      MovieApiRequests.fetchGenres.mockResolvedValueOnce(mockGenres);
      MovieApiRequests.fetchMovies.mockResolvedValueOnce([]);

      render(
        <MovieSearch
          onGenreChange={mockFunctions.onGenreChange}
          onSortChange={mockFunctions.onSortChange}
          onListChange={mockFunctions.onListChange}
          onClear={mockFunctions.onClear}
        />
      );
    });

    // Espera a que el cambio de género esté presente antes de continuar
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Todo'), { target: { value: '1' } });
    });

    expect(MovieApiRequests.fetchMovies).toHaveBeenCalledWith('1', 'popularity.desc');
  });
});
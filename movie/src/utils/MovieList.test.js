import { render, screen, waitFor } from '@testing-library/react';
import MovieList from '../components/MovieList/MovieList';
import MovieApiRequests from '../../src/services/MovieApiRequests';

jest.mock('../../src/services/MovieApiRequests', () => ({
  fetchMovies: jest.fn(),
}));


const mockMovies = [
  { id: 1, poster_path: '/path1.jpg', original_title: 'Movie 1', release_date: '2023-01-01' },
  { id: 2, poster_path: '/path2.jpg', original_title: 'Movie 2', release_date: '2023-01-02' },
];


describe('MovieList', () => {
  it('renders MovieList component with movies', async () => {
  
    MovieApiRequests.fetchMovies.mockResolvedValueOnce({ results: mockMovies });

    render(<MovieList />);

    // 
    expect(MovieApiRequests.fetchMovies).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
    
  });

  
});

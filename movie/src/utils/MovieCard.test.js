import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard/MovieCard';
import { getByText } from '@testing-library/dom';

const mockMovie = {
  id: 1,
  poster_path: '/path1.jpg',
  original_title: 'Movie 1',
  release_date: '2023-01-01',
  title: 'Movie 1',
};

describe('MovieCard', () => {
  it('renders MovieCard component', () => {
    render(<MovieCard movie={mockMovie} />);

    
    expect(screen.getByText(/Movie 1/i)).toBeInTheDocument();
    expect(screen.getByText(/\d{4}-\d{2}-\d{2}/)).toBeInTheDocument();
    
  });

 
});

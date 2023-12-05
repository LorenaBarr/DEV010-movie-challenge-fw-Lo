import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard/MovieCard';

const mockMovie = {
  id: 1,
  poster_path: '/path1.jpg',
  original_title: 'Movie 1',
  release_date: '2023-01-01',
};

describe('MovieCard', () => {
  it('renders MovieCard component with movie details', () => {
    render(<MovieCard movie={mockMovie} />);

    // Asegúrate de que se renderizan los detalles de la película
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    // Puedes agregar más expectativas según sea necesario
  });

  // Agrega más pruebas según sea necesario
});

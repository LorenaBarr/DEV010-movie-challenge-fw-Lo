import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieGrid from '../components/MovieGrid/MovieGrid';

const mockMovies = [
  { id: 1, poster_path: '/path1.jpg', original_title: 'Movie 1', release_date: '2023-01-01' },
  { id: 2, poster_path: '/path2.jpg', original_title: 'Movie 2', release_date: '2023-01-02' },
];

describe('MovieGrid', () => {
  it('renders MovieGrid component with movies', () => {
    render(<MovieGrid movies={mockMovies} />);

    // Asegúrate de que se renderizan las tarjetas de películas
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  // Agrega más pruebas según sea necesario
});

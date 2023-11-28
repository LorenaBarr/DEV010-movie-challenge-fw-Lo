import { render, screen } from '@testing-library/react';
import { mockAxios } from '../utils/testUtils';  
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';

jest.mock('axios');

test('renders movie list', async () => {
  mockAxios({
    results: [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ],
  });

  render(<MovieList />);

  const movie1 = await screen.findByText('Movie 1');
  const movie2 = await screen.findByText('Movie 2');

  expect(movie1).toBeInTheDocument();
  expect(movie2).toBeInTheDocument();

  expect(axios).toHaveBeenCalledWith({
    method: 'get',
    url: 'https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}', 
  });
});
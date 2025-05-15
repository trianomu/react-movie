// MovieList.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MovieList from '../components/MovieList';
import { MemoryRouter } from 'react-router-dom';
import tmdb from '../api/apiHelper';

// Mock API call
jest.mock('../api/apiHelper');
const mockGet = tmdb.get as jest.Mock;

test('fetches and displays movies correctly', async () => {
  const mockMovies = {
    data: {
      results: [
        { id: 1, title: 'Inception', release_date: '2010-07-16', poster_path: '/poster.jpg' },
      ],
      page: 1,
      total_pages: 1,
    },
  };
  mockGet.mockResolvedValueOnce(mockMovies);

  render(
    <MemoryRouter>
      <MovieList />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText(/Inception/i));

  const movieTitle = screen.getByText(/Inception/i);
  expect(movieTitle).toBeInTheDocument();
});

test('loads more movies on button click', async () => {
  const mockMoviesPage1 = {
    data: {
      results: [
        { id: 1, title: 'Inception', release_date: '2010-07-16', poster_path: '/poster.jpg' },
      ],
      page: 1,
      total_pages: 2,
    },
  };
  const mockMoviesPage2 = {
    data: {
      results: [
        { id: 2, title: 'The Dark Knight', release_date: '2008-07-18', poster_path: '/poster2.jpg' },
      ],
      page: 2,
      total_pages: 2,
    },
  };

  mockGet.mockResolvedValueOnce(mockMoviesPage1).mockResolvedValueOnce(mockMoviesPage2);

  render(
    <MemoryRouter>
      <MovieList />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText(/Inception/i));
  const loadMoreButton = screen.getByText('Load More');
  fireEvent.click(loadMoreButton);

  await waitFor(() => screen.getByText(/The Dark Knight/i));
  expect(screen.getByText(/The Dark Knight/i)).toBeInTheDocument();
});

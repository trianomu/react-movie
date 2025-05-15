import { render, screen } from '@testing-library/react';
import MovieCard from '../components/movies/MovieCard';
import { MemoryRouter } from 'react-router-dom';

const movie = {
  id: 1,
  title: 'Inception',
  release_date: '2010-07-16',
  poster_path: '/poster.jpg',
  overview: 'lorem ipsum dolor sit amet',
};

test('renders movie card with correct details', () => {
  render(
    <MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>
  );

  const title = screen.getByText(/Inception/i);
  const releaseYear = screen.getByText(/2010/i);
  const poster = screen.getByAltText(/Inception/i);

  expect(title).toBeInTheDocument();
  expect(releaseYear).toBeInTheDocument();
  expect(poster).toBeInTheDocument();
  expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/poster.jpg');
});

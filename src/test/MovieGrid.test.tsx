import { render, screen } from '@testing-library/react'
import MovieGrid from '../components/movies/MovieGrid'
import { MemoryRouter } from 'react-router-dom'

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    poster_path: '/poster1.jpg',
    release_date: '2010-07-16',
    overview: 'A dream movie',
  },
  {
    id: 2,
    title: 'Interstellar',
    poster_path: '/poster2.jpg',
    release_date: '2014-11-07',
    overview: 'Space movie',
  },
]

describe('MovieGrid', () => {
  it('renders movie cards in a grid', () => {
    render(
      <MemoryRouter>
        <MovieGrid movies={mockMovies} />
      </MemoryRouter>
    )

    const movieCards = screen.getAllByTestId('movie-card')
    expect(movieCards).toHaveLength(2)
  })

  it('renders empty grid if no movies', () => {
    render(
      <MemoryRouter>
        <MovieGrid movies={[]} />
      </MemoryRouter>
    )

    const movieCards = screen.queryAllByTestId('movie-card')
    expect(movieCards).toHaveLength(0)
  })
})
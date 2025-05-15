import { render, screen } from '@testing-library/react'
import Home from '../pages/Home'

jest.mock('../components/MovieList', () => () => <div data-testid="movie-list">Mock MovieList</div>)

describe('Home Page', () => {
  it('renders MovieList component', () => {
    render(<Home />)

    const movieList = screen.getByTestId('movie-list')
    expect(movieList).toBeInTheDocument()
  })
})

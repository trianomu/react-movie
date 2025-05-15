import { render, screen, fireEvent } from '@testing-library/react'
import CategoryTabs from '../components/movies/CategoryTab'

describe('CategoryTabs', () => {
  it('renders all categories', () => {
    render(<CategoryTabs active="popular" onSelect={() => {}} />)

    expect(screen.getByText(/now playing/i)).toBeInTheDocument()
    expect(screen.getByText(/popular/i)).toBeInTheDocument()
    expect(screen.getByText(/top rated/i)).toBeInTheDocument()
    expect(screen.getByText(/upcoming/i)).toBeInTheDocument()
  })

  it('applies active class to selected category', () => {
    render(<CategoryTabs active="top_rated" onSelect={() => {}} />)
    const activeButton = screen.getByText(/top rated/i)
    expect(activeButton).toHaveClass('bg-red-600')
    expect(activeButton).toHaveClass('text-white')
  })

  it('calls onSelect with correct category when clicked', () => {
    const mockSelect = jest.fn()
    render(<CategoryTabs active="popular" onSelect={mockSelect} />)

    const button = screen.getByText(/now playing/i)
    fireEvent.click(button)

    expect(mockSelect).toHaveBeenCalledWith('now_playing')
  })
})
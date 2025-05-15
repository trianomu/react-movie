import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

describe('Navbar', () => {
  const renderWithRouter = (ui: React.ReactElement) =>
    render(<BrowserRouter>{ui}</BrowserRouter>)

  it('renders navbar with title', () => {
    renderWithRouter(<Navbar darkMode={false} toggleDarkMode={() => {}} />)
    expect(screen.getByText(/react/i)).toBeInTheDocument()
    expect(screen.getByText(/movie/i)).toBeInTheDocument()
  })

  it('shows MoonIcon when darkMode is false', () => {
    renderWithRouter(<Navbar darkMode={false} toggleDarkMode={() => {}} />)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })

  it('shows SunIcon when darkMode is true', () => {
    renderWithRouter(<Navbar darkMode={true} toggleDarkMode={() => {}} />)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })

  it('calls toggleDarkMode when clicked', () => {
    const mockToggle = jest.fn()
    renderWithRouter(<Navbar darkMode={false} toggleDarkMode={mockToggle} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockToggle).toHaveBeenCalled()
  })
})
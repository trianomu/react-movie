import { render, screen } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../components/context/ThemeProvider'
import userEvent from '@testing-library/user-event'

function TestComponent() {
  const { darkMode, toggleDarkMode } = useTheme()
  return (
    <div>
      <p>{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('should default to system preference if no localStorage', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText(/dark mode/i)).toBeInTheDocument()
  })

  it('should read darkMode from localStorage', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))

    localStorage.setItem('darkMode', 'false')

    render(
        <ThemeProvider>
        <TestComponent />
        </ThemeProvider>
    )

    expect(screen.getByText(/light mode/i)).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

  it('should toggle dark mode when button clicked', async () => {
    localStorage.setItem('darkMode', 'true')
    document.documentElement.classList.add('dark')

    render(
        <ThemeProvider>
        <TestComponent />
        </ThemeProvider>
    )

    const button = screen.getByRole('button', { name: /toggle/i })

    expect(screen.getByText(/dark mode/i)).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await userEvent.click(button)

    expect(screen.getByText(/light mode/i)).toBeInTheDocument()
    expect(localStorage.getItem('darkMode')).toBe('false')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

  it('throws error if useTheme used outside provider', () => {
    const UseThemeAlone = () => {
      useTheme()
      return null
    }

    expect(() => render(<UseThemeAlone />)).toThrowError(
      /useTheme must be used within ThemeProvider/
    )
  })
})

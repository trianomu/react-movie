import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../components/ui/Button'

test('renders button and responds to click', () => {
  const onClick = jest.fn()
  render(<Button onClick={onClick}>Click Me</Button>)
  fireEvent.click(screen.getByText(/click me/i))
  expect(onClick).toHaveBeenCalled()
})

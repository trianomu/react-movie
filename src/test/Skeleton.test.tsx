import { render } from '@testing-library/react'
import SkeletonCard from '../components/ui/Skeleton'

describe('SkeletonCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<SkeletonCard />)
    expect(container).toBeInTheDocument()
  })

  it('has animate-pulse class', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('has correct height and width classes', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.firstChild).toHaveClass('h-80', 'w-full')
  })

  it('has gray background for light mode and dark mode', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.firstChild).toHaveClass('bg-gray-200', 'dark:bg-gray-700')
  })
})
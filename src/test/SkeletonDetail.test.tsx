import { render, screen } from '@testing-library/react'
import SkeletonMovieDetail from '../components/ui/SkeletonDetail'

describe('SkeletonMovieDetail', () => {
  it('renders without crashing', () => {
    const { container } = render(<SkeletonMovieDetail />)
    expect(container).toBeInTheDocument()
  })

  it('has animate-pulse class for animation', () => {
    const { container } = render(<SkeletonMovieDetail />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('renders poster skeleton block', () => {
    render(<SkeletonMovieDetail />)
    const posterSkeleton = screen.getByTestId('skeleton-poster')
    expect(posterSkeleton).toBeInTheDocument()
  })

  it('renders 5 cast skeletons', () => {
    render(<SkeletonMovieDetail />)
    const castBlocks = screen.getAllByTestId('cast-skeleton')
    expect(castBlocks.length).toBe(5)
  })

  it('renders trailer skeleton block', () => {
    render(<SkeletonMovieDetail />)
    const trailerBlock = screen.getByTestId('trailer-skeleton')
    expect(trailerBlock).toBeInTheDocument()
  })
})
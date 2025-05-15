import { render, screen, fireEvent } from '@testing-library/react'
import MovieDetail from '../pages/MovieDetail'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import apiHelper from '../api/apiHelper'

jest.mock('../api/apiHelper')
const mockedApi = apiHelper as jest.Mocked<typeof apiHelper>

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  release_date: '2025-01-01',
  runtime: 120,
  status: 'Released',
  genres: [{ name: 'Action' }],
  overview: 'Test movie overview',
  original_language: 'en',
  vote_average: 8.5,
  vote_count: 1000,
  budget: 100000000,
  revenue: 300000000,
  imdb_id: 'tt1234567',
  homepage: 'https://testmovie.com',
  poster_path: '/test.jpg'
}

const mockCast = [
  { name: 'Actor 1', character: 'Hero', profile_path: '/actor1.jpg' }
]

const mockCrew = [
  { name: 'Director 1', job: 'Director' }
]

const mockVideos = [
  { key: 'trailer123', site: 'YouTube', type: 'Trailer', official: true }
]

const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={['/movie/1']}>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </MemoryRouter>
  )
}

beforeEach(() => {
  mockedApi.get.mockImplementation((url: string) => {
    if (url.includes('/credits')) {
      return Promise.resolve({ data: { cast: mockCast, crew: mockCrew } })
    }
    if (url.includes('/videos')) {
      return Promise.resolve({ data: { results: mockVideos } })
    }
    if (url.includes('/movie/')) {
      return Promise.resolve({ data: mockMovie })
    }
    return Promise.reject(new Error('Unknown URL'))
  })
})

test('renders movie detail', async () => {
  renderWithRouter()

  // Tunggu sampai judul film muncul
  const heading = await screen.findByRole('heading', { name: /test movie/i })
  expect(heading).toBeInTheDocument()

  // Cek overview dan director muncul
  expect(screen.getByText(/test movie overview/i)).toBeInTheDocument()
  expect(screen.getByText(/director 1/i)).toBeInTheDocument()
})

test('navigates back when ← Back is clicked', async () => {
  // Mock semua endpoint
  mockedApi.get.mockImplementation((url) => {
    if (url.includes('/credits')) {
      return Promise.resolve({ data: { cast: mockCast, crew: mockCrew } })
    }
    if (url.includes('/videos')) {
      return Promise.resolve(({ data: { results: [
          {
            key: 'trailer123',
            site: 'YouTube',
            type: 'Trailer',
            official: true,
          },
        ], } }))
    }
    if (url.includes('/movie/')) {
      return Promise.resolve({ data: mockMovie })
    }
    return Promise.reject(new Error('Unknown URL'))
  })

  renderWithRouter()

  // Tunggu sampai data tampil
  await screen.findAllByText(/test movie/i)
  expect(screen.getByText((content, node) =>
    node?.tagName === 'H1' && /test movie/i.test(content)
  )).toBeInTheDocument()

  // Klik tombol back
  const backBtn = screen.getByRole('button', { name: /back/i })
  fireEvent.click(backBtn)

})

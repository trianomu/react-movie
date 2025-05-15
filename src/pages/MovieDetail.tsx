import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiHelper from '../api/apiHelper'
import type { Cast, Crew, Movie, Video } from '../types/movie'
import SkeletonMovieDetail from '../components/ui/SkeletonDetail'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [cast, setCast] = useState<Cast[]>([])
  const [director, setDirector] = useState<string | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const [detailRes, creditRes, videoRes] = await Promise.all([
          apiHelper.get(`/movie/${id}`),
          apiHelper.get(`/movie/${id}/credits`),
          apiHelper.get(`/movie/${id}/videos`),
        ])

        setMovie(detailRes.data)
        setCast(creditRes.data.cast.slice(0, 5)) // top 5 cast

        const directors = creditRes.data.crew.filter((crew: Crew) => crew.job === 'Director')
        setDirector(directors[0]?.name ?? null)

        setVideos(videoRes.data.results)
      } catch (error) {
        console.error('Failed to fetch detail', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetail()
  }, [id])

  if (loading) return <SkeletonMovieDetail />
  if (!movie) return <p className="text-center">Movie not found.</p>

  // Helper: find first YouTube trailer video
  const trailer = videos.find(
    (vid) =>
      vid.site === 'YouTube' &&
      vid.type === 'Trailer' &&
      vid.official === true
  ) || videos.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer')

  const formatCurrency = (amount: number) =>
    amount ? `$${amount.toLocaleString()}` : '-'

  return (
    <div className="max-w-5xl mx-auto p-4 text-gray-800 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-6 font-bold"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {movie.release_date} • {movie.runtime} mins • {movie.status}
          </p>

          {Array.isArray(movie.genres) && movie.genres?.length > 0 && (
            <p className="mb-2">
              <span className="font-bold">Genres:</span>{' '}
              {Array.isArray(movie.genres) && movie.genres.map(g => g.name).join(', ')}
            </p>
          )}

          {director && (
            <p className="mb-2">
              <span className="font-bold">Director:</span> {director}
            </p>
          )}

          <p className="mb-4 text-sm">{movie.overview}</p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><span className="font-bold">Language:</span> {movie.original_language?.toUpperCase() ?? 'N/A'}</p>
            <p><span className="font-bold">Vote Average:</span> {movie.vote_average} ({movie.vote_count} votes)</p>
            <p><span className="font-bold">Budget:</span> {formatCurrency(movie.budget ?? 0)}</p>
            <p><span className="font-bold">Revenue:</span> {formatCurrency(movie.revenue ?? 0)}</p>
            {movie.imdb_id && (
              <p>
                <span className="font-bold">IMDb:</span>{' '}
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on IMDb
                </a>
              </p>
            )}
            {movie.homepage && (
              <p>
                <span className="font-bold">Website:</span>{' '}
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {movie.homepage}
                </a>
              </p>
            )}
          </div>

          <div className="mt-4">
            <h2 className="font-bold mb-1">Top Cast:</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {cast.map((c) => (
                <li key={c.name} className="text-center">
                  <img
                    src={
                      c.profile_path
                        ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
                        : '/placeholder.jpg' // fallback image if not available
                    }
                    alt={c.name}
                    className="w-full h-auto rounded mb-2 object-cover"
                  />
                  <p className="text-sm font-bold">{c.name}</p>
                  <p className="text-xs italic text-gray-500">{c.character}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Trailer</h2>
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Movie Trailer"
              allowFullScreen
              frameBorder="0"
              className="w-full h-full rounded shadow"
            />
          </div>
        </div>
      )}
    </div>
  )
}

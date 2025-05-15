import MovieCard from "./MovieCard"
import type { Movie } from "../../types/movie"

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} data-testid="movie-card" movie={movie} />
      ))}
    </div>
  )
}
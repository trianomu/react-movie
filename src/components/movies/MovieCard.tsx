import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import React from "react";

interface Props {
    movie: Movie
}

function MovieCard({ movie }: Props) {
    return (
        <Link to={`/movie/${movie.id}`}>
            <div data-testid="movie-card" className="relative group overflow-hidden rounded shadow hover:scale-105 transition duration-300">
                <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title} />
                <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold">{movie.title}</h3>
                    <p className="text-sm">{new Date(movie.release_date).getFullYear()}</p>
                </div>
            </div>
        </Link>
    )
}

export default React.memo(MovieCard)
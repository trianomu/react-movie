import { useCallback, useEffect, useState } from "react"
import type { Movie, MovieResponse } from "../types/movie"
import tmdb from "../api/apiHelper"
import SearchBar from "./Searchbar"
import SkeletonCard from "./ui/Skeleton"
import CategoryTabs from "./movies/CategoryTab"
import MovieGrid from "./movies/MovieGrid"
import Button from "./ui/Button"
import { ArrowDownIcon } from "@heroicons/react/16/solid"
  
export default function() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('now_playing')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    

  const fetchMovies = useCallback(async (
    q = query,
    cat = category,
    pageNum = 1
  ) => {
    setLoading(true)
    const endpoint = q ? "/search/movie" : `/movie/${cat}`
    const res = await tmdb.get<MovieResponse>(endpoint, {
      params: { query: q, page: pageNum },
    })
    setMovies((prev) =>
      pageNum === 1 ? res.data.results : [...prev, ...res.data.results]
    )
    setHasMore(res.data.page < res.data.total_pages)
    setLoading(false)
  },[query, category])

  useEffect(() => {
    fetchMovies("", "now_playing", 1)
  }, [])
  
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <main className="max-w-3/4 mx-auto p-4">
        <SearchBar onSearch={(q) => {
          setQuery(q)
          setPage(1)
          fetchMovies(q, category, 1)
        }} />
        <CategoryTabs active={category} onSelect={(cat) => {
          setCategory(cat)
          setQuery('')         
          setPage(1)           
          fetchMovies('', cat, 1)
        }} />

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : movies.length === 0 ? (
            <h3 className="text-center text-xl text-black dark:text-gray-300 mt-8">No movies found.</h3>
          ) : (
          <>
            <MovieGrid movies={movies} />
            {hasMore && (
              <div className="text-center mt-6 flex justify-center">
                <Button onClick={() => {
                    const next = page + 1
                    setPage(next)
                    fetchMovies(query, category, next)
                  }}
                >
                  <ArrowDownIcon className="w-5 h-5 inline-block mr-2" />
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
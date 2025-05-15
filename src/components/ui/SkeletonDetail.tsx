export default function SkeletonMovieDetail() {
  return (
    <div className="max-w-5xl mx-auto p-4 animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 h-10 w-24 rounded mb-6" />

      {/* Layout: poster dan text */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="w-full md:w-1/3 bg-gray-300 dark:bg-gray-700 h-[450px] rounded" data-testid="skeleton-poster" />

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
          </div>

          {/* Cast */}
          <div>
            <div className="h-5 bg-gray-300 dark:bg-gray-700 w-32 rounded mb-3" />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} data-testid="cast-skeleton">
                  <div className="w-full h-36 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer */}
      <div className="mt-8" data-testid="trailer-skeleton">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 w-28 rounded mb-2" />
        <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded w-full" />
      </div>
    </div>
  )
}

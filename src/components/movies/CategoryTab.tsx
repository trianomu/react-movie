import { ClockIcon, FireIcon, PlayCircleIcon, StarIcon } from "@heroicons/react/16/solid"

const categories = [
  { label: "Now Playing", value: "now_playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
]

const icons = {
  now_playing: <PlayCircleIcon className="w-4 h-4 inline mr-1" />,
  popular: <FireIcon className="w-4 h-4 inline mr-1" />,
  top_rated: <StarIcon className="w-4 h-4 inline mr-1" />,
  upcoming: <ClockIcon className="w-4 h-4 inline mr-1" />,
}

export default function CategoryTabs({
  active,
  onSelect,
}: {
  active: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`px-3 py-2 text-md font-semibold rounded flex items-center gap-1 ${
            active === cat.value
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {icons[cat.value as keyof typeof icons]}    
          {cat.label}
        </button>
      ))}
    </div>
  )
}
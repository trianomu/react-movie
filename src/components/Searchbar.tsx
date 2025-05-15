import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

interface Props {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find your movies..."
        className="flex-1 border border-gray-300 rounded px-4 py-2 dark:text-black"
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex gap-1 items-center"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        Search
      </button>
    </form>
  )
}
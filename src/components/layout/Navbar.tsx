import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

interface NavbarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
    <Link to={`/`}>
        <h1 className="text-xl  sm:text-3xl font-bold text-red-500">React <span className="text-black dark:text-white">Movie</span></h1>
    </Link>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-300 bg-red-600 rounded px-3 py-1 text-sm"
      >
         {darkMode ? (
          <SunIcon className="h-6 w-6 text-white-400" />
        ) : (
          <MoonIcon className="h-6 w-6 text-white" />
        )}
      </button>
    </header>
  )
}

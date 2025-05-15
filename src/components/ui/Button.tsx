import type { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const baseClass =
    "px-4 py-2 rounded font-medium transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-1"
  const variantClass =
    variant === "primary"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"

  return (
    <button {...props} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  )
}
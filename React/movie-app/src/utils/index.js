// Image helpers
export const getImageUrl = (path, size = 'w500') =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : '/placeholder-movie.png'

export const getBackdropUrl = (path) =>
  path
    ? `https://image.tmdb.org/t/p/original${path}`
    : null

// Date helpers
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getYear = (dateStr) =>
  dateStr ? new Date(dateStr).getFullYear() : 'N/A'

// String helpers
export const truncate = (str, maxLength = 150) => {
  if (!str) return ''
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str
}

// Rating helpers
export const formatRating = (rating) =>
  rating ? Number(rating).toFixed(1) : 'N/A'

export const getRatingColor = (rating) => {
  if (rating >= 7) return '#22c55e'   // green
  if (rating >= 5) return '#f59e0b'   // amber
  return '#ef4444'                     // red
}

// Sort options for discover API
export const SORT_OPTIONS = [
  { label: 'home.sortPopularity', value: 'popularity.desc' },
  { label: 'home.sortRating', value: 'vote_average.desc' },
  { label: 'home.sortDate', value: 'release_date.desc' },
  { label: 'home.sortTitle', value: 'original_title.asc' },
]

// cn utility (classnames merger)
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
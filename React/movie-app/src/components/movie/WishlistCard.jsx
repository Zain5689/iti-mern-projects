import { Link } from 'react-router'
import { Heart, Star } from 'lucide-react'
import { useWishlistStore, useAuthStore } from '@/store'
import { getImageUrl, formatDate, truncate } from '@/utils'
import toast from 'react-hot-toast'

export default function WishlistCard({ movie }) {
  const { removeFromWishlist } = useWishlistStore()

  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    removeFromWishlist(movie.id)
    toast.success('Removed from wishlist!')
  }

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-[var(--color-card)] rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow">

        {/* Poster */}
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-24 h-36 object-cover rounded-xl shrink-0"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">

          {/* Title + Heart */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-lg text-[var(--color-text)] line-clamp-1">
              {movie.title}
            </h3>
            <button onClick={handleRemove} className="shrink-0">
              <Heart size={20} fill="#E50914" stroke="#E50914" />
            </button>
          </div>

          {/* Date */}
          <p className="text-xs text-[var(--color-text-muted)] mb-2">
            {formatDate(movie.release_date)}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${star <= Math.round(movie.vote_average / 2) ? 'text-primary' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-[var(--color-text-muted)] ml-1">
              {movie.vote_count}
            </span>
          </div>

          {/* Overview */}
          <p className="text-xs text-[var(--color-text-muted)] line-clamp-3">
            {truncate(movie.overview, 120)}
          </p>

        </div>
      </div>
    </Link>
  )
}
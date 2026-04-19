import { Heart, Play } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useWishlistStore, useAuthStore } from '@/store'
import { getBackdropUrl, formatDate, truncate } from '@/utils'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export default function MoviePreview({ movie, position }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()
  const wishlisted = isAuthenticated && isInWishlist(movie.id)

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      toast.error(t("auth.loginRequired") || "Please login first")
      return
    }
    toggleWishlist({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    })
  }

  return (
    <div
      className="absolute z-50 w-72 rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] bg-[var(--color-card)] animate-fade-in"
      style={{
        top: position === 'bottom' ? '105%' : 'auto',
        bottom: position === 'top' ? '105%' : 'auto',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Backdrop */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={getBackdropUrl(movie.backdrop_path) || '/placeholder.png'}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-sm text-[var(--color-text)] line-clamp-1">
            {movie.title}
          </h3>
          <span className="text-xs text-[var(--color-text-muted)] shrink-0">
            {formatDate(movie.release_date)}
          </span>
        </div>

        <p className="text-xs text-[var(--color-text-muted)] line-clamp-3">
          {truncate(movie.overview, 100)}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={(e) => {
              e.preventDefault()
              navigate(`/movie/${movie.id}`)
            }}
            className="flex-1 btn-primary text-xs py-2 flex items-center justify-center gap-1"
          >
            <Play size={14} />
            {t("movie.play")}
          </button>
          <button
            onClick={handleWishlist}
            className="p-2 rounded-lg border border-[var(--color-border)] hover:border-primary transition-colors"
          >
            <Heart
              size={16}
              fill={wishlisted ? '#E50914' : 'none'}
              stroke={wishlisted ? '#E50914' : 'currentColor'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
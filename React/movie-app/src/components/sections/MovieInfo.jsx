import { Heart, Globe } from "lucide-react"
import { useWishlistStore, useAuthStore } from "@/store"
import { getImageUrl, formatDate } from "@/utils"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

export default function MovieInfo({ movie, onlyPoster, onlyDetails }) {
  const { t } = useTranslation()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const wishlisted = isInWishlist(movie.id)
  const { isAuthenticated } = useAuthStore()

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
     if (!isAuthenticated) {
    toast.error(t("auth.loginRequired") || "Please login first");
    return
  }
    const added = toggleWishlist({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    })
    toast.success(added ? t("movie.addWishlist") : t("movie.removeWishlist"))
  }

  if (onlyPoster) {
    return (
      <div className="col-span-1">
        <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* <button
            onClick={handleToggleWishlist}
            className="absolute top-4 end-4 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200 active:scale-90"
            aria-label={wishlisted ? t("movie.removeWishlist") : t("movie.addWishlist")}
          >
            <Heart
              size={24}
              fill={wishlisted ? "#F5C518" : "none"}
              stroke={wishlisted ? "#F5C518" : "white"}
            />
          </button> */}
        </div>
      </div>
    )
  }

  if (onlyDetails) {
    return (
      <div className="space-y-5">

        {/* Title + Heart */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            {movie.title}
          </h1>
          <button onClick={handleToggleWishlist}>
            <Heart
              size={24}
              fill={wishlisted ? "#E50914" : "none"}
              stroke={wishlisted ? "#E50914" : "currentColor"}
              className="text-[var(--color-text-muted)]"
            />
          </button>
        </div>

        {/* Date */}
        <p className="text-sm text-[var(--color-text-muted)]">
          {formatDate(movie.release_date)}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-xl ${star <= Math.round(movie.vote_average / 2) ? "text-primary" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-[var(--color-text-muted)]">
            {movie.vote_count}
          </span>
        </div>

        {/* Overview */}
        <p className="text-[var(--color-text)] text-sm leading-relaxed">
          {movie.overview}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-4 py-1.5 bg-primary text-black text-sm font-semibold rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Duration + Language */}
        <div className="flex gap-8 text-sm">
          <div>
            <span className="font-semibold text-[var(--color-text)]">Duration: </span>
            <span className="text-[var(--color-text-muted)]">{movie.runtime} Min.</span>
          </div>
          <div>
            <span className="font-semibold text-[var(--color-text)]">Languages: </span>
            <span className="text-[var(--color-text-muted)] uppercase">{movie.original_language}</span>
          </div>
        </div>

        {/* Website */}
        {movie.homepage && (
          <a
            href={movie.homepage}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text)] hover:border-primary transition-colors"
          >
            <Globe size={14} />
            Website
          </a>
        )}

      </div>
    )
  }

  return null
}


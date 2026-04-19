import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useWishlistStore, useAuthStore } from "@/store";
import { getImageUrl, formatDate } from "@/utils";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import MoviePreview from "../movie/MoviePreview";
import confetti from "canvas-confetti";

export default function MovieCard({ movie }) {
  const { t } = useTranslation();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const wishlisted = isAuthenticated && isInWishlist(movie.id);
  const [showPreview, setShowPreview] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setShowPreview(true), 800);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setShowPreview(false);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error(t("auth.loginRequired") || "Please login first");
      return;
    }
    const added = toggleWishlist({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    });
    if (added) {
      confetti({
        particleCount: 300,
        spread: 70,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ["#E50914", "#ff4d4d", "#ff9999"],
        scalar: 0.8,
      });
    }
    toast.success(added ? t("movie.addWishlist") : t("movie.removeWishlist"));
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/movie/${movie.id}`} className="group block">
        <div className="relative rounded-xl overflow-hidden card-hover">
          {/* Poster */}
          <div className="relative aspect-[2/3]">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/500x750/1a1a1a/666666?text=No+Poster";
              }}
            />

            {/* Rating badge - bottom left */}
            <div className="absolute bottom-2 start-2">
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="#1a1a1a"
                  stroke="#2d2d2d"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={
                    movie.vote_average >= 7
                      ? "#22c55e"
                      : movie.vote_average >= 5
                        ? "#F5C518"
                        : "#E50914"
                  }
                  strokeWidth="3"
                  strokeDasharray={`${movie.vote_average * 9.42} 94.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
                <text
                  x="18"
                  y="22"
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="bold"
                >
                  {Math.round(movie.vote_average * 10)}%
                </text>
              </svg>
            </div>

            {/* 3 dots - top right */}
            <div className="absolute top-2 end-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center">
              <span className="text-white text-xs leading-none">•••</span>
            </div>
          </div>

          {/* Info */}
          <div className="pt-2 pb-1 px-1 flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-[var(--color-text)] line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {formatDate(movie.release_date)}
              </p>
            </div>

            {/* Heart icon */}
            <button
              onClick={handleToggleWishlist}
              className="shrink-0 mt-0.5"
              aria-label={
                wishlisted ? t("movie.removeWishlist") : t("movie.addWishlist")
              }
            >
              <Heart
                size={18}
                fill={wishlisted ? "#E50914" : "none"}
                stroke={wishlisted ? "#E50914" : "currentColor"}
                className="text-[var(--color-text-muted)]"
              />
            </button>
          </div>
        </div>
      </Link>
      {/* Preview Popup */}
      {showPreview && <MoviePreview movie={movie} position="bottom" />}
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks";
import {
  getNowPlaying,
  getGenres,
  discoverMovies,
} from "@/services/movieService";
import MovieCard from "@/components/common/MovieCard";
import Pagination from "@/components/common/Pagination";
import GenreFilter from "@/components/common/GenreFilter";
import SortSelect from "@/components/common/SortSelect";
import { Film } from "lucide-react";
// Search
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
// cinametic spotlight
import { Heart } from "lucide-react";
import { useWishlistStore, useAuthStore } from "@/store";
import { formatDate } from "@/utils";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function HomePage() {
  const { t } = useTranslation();
  usePageTitle(t("home.nowPlaying"));

  const [movies, setMovies] = useState([]);
  const [genres, setGenresState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const featuredMovie =
    movies?.length > 0
      ? movies.reduce(
          (best, movie) =>
            movie.vote_average > best.vote_average ? movie : best,
          movies[0],
        )
      : null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${query}`);
  };

  // Fetch genres once
  const { i18n } = useTranslation();

  useEffect(() => {
    getGenres()
      .then((res) => setGenresState(res.data.genres))
      .catch(() => {});
  }, [i18n.language]); // Refetch genres if language changes

  // Fetch movies
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (selectedGenre || sortBy !== "popularity.desc") {
        // Use discover API when filtering/sorting
        res = await discoverMovies({
          page: currentPage,
          sort_by: sortBy,
          with_genres: selectedGenre || undefined,
        });
      } else {
        // Default: now playing
        res = await getNowPlaying(currentPage);
      }
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      setError(err.response?.data?.status_message || err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedGenre, sortBy]);

  useEffect(() => {
    fetchMovies();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchMovies, currentPage, selectedGenre, sortBy, i18n.language]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSurpriseMe = () => {
    if (!movies || movies.length === 0) return;
    const random = movies[Math.floor(Math.random() * movies.length)];
    navigate(`/movie/${random.id}`);
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl animate-fade-in">
      {/* Hero Search */}
      {/* Cinematic Spotlight */}
      {featuredMovie && (
        <div className="relative rounded-2xl overflow-hidden mb-10 h-[400px]">
          {/* Backdrop */}
          <img
            src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
            alt={featuredMovie.title}
            className="object-cover w-full h-full"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="max-w-lg">
              <h1 className="mb-2 text-4xl font-black text-white">
                {featuredMovie.title}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-primary">
                  ★ {featuredMovie.vote_average?.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">
                  {formatDate(featuredMovie.release_date)}
                </span>
              </div>
              <p className="mb-6 text-sm text-gray-300 line-clamp-2">
                {featuredMovie.overview}
              </p>
              <div className="flex gap-3">
                <Link
                  to={`/movie/${featuredMovie.id}`}
                  className="flex items-center gap-2 btn-primary"
                >
                  ▶ {t("home.watchNow") || "Watch Now"}
                </Link>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error(t("auth.loginRequired") || "Please login first");
                      return;
                    }
                    toggleWishlist(featuredMovie);
                  }}
                  className="px-5 py-2.5 rounded-lg border border-white/30 text-white hover:border-primary hover:text-primary transition-all font-semibold text-sm flex items-center gap-2"
                >
                  <Heart
                    size={16}
                    fill={isInWishlist(featuredMovie.id) ? "#E50914" : "none"}
                    stroke={
                      isInWishlist(featuredMovie.id)
                        ? "#E50914"
                        : "currentColor"
                    }
                  />
                  {t("movie.wishlist") || "Add to Watch list"}
                </button>
              </div>
            </div>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-2 mt-6 sm:flex-row"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder= {t("home.searchPlaceholder") || "Search for movies..."}
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/30 bg-black/50 text-white placeholder-gray-400 outline-none focus:border-primary backdrop-blur-sm"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-full gap-2 btn-primary sm:w-auto"
              >
                <Search size={18} />
                {t("home.search") || "Search"}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSurpriseMe}
          className="relative flex items-center gap-2 px-6 py-3 overflow-hidden text-sm font-bold text-white transition-all duration-300 bg-black rounded-full shadow-xl group hover:scale-105"
        >
          <span
            className="text-xl animate-spin"
            style={{ animationDuration: "2s" }}
          >
            🎲
          </span>
          <span>{t("home.surpriseMe")}</span>
          <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-primary group-hover:opacity-20" />
        </button>
      </div>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl tracking-wider font-heading text-primary">
          {t("home.nowPlaying")}
        </h1>
        <SortSelect value={sortBy} onChange={handleSortChange} />
      </div>

      {/* Genre Filter */}
      {genres.length > 0 && (
        <div className="mb-8">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[2/3] rounded-xl" />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="py-20 text-center">
          <p className="text-lg text-[var(--color-text-muted)] mb-4">
            {t("common.error")}
          </p>
          <button onClick={fetchMovies} className="btn-primary">
            {t("common.retry") || "Retry"}
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && movies.length === 0 && (
        <div className="py-20 text-center">
          <Film
            size={64}
            className="mx-auto text-[var(--color-text-muted)] mb-4"
          />
          <p className="text-lg text-[var(--color-text-muted)]">
            No movies found.
          </p>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

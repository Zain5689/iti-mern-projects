import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { usePageTitle, useDebounce } from '@/hooks'
import { searchMovies } from '@/services/movieService'
import MovieCard from '@/components/common/MovieCard'
import PageSkeleton from '@/components/common/PageSkeleton'

export default function SearchPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const debouncedQuery = useDebounce(query, 500)

  usePageTitle(debouncedQuery ? `Search: ${debouncedQuery}` : 'Search')

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }

    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await searchMovies(debouncedQuery, page)
        setResults(res.data.results)
        setTotalPages(res.data.total_pages)
        setSearchParams({ q: debouncedQuery })
      } catch (err) {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [debouncedQuery, page])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Search bar */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
          placeholder={t('search.placeholder')}
          className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-primary"
        />
        <button className="btn-primary flex items-center gap-2">
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Results label */}
      {debouncedQuery && !loading && (
        <p className="text-[var(--color-text-muted)] mb-6">
          {t('search.results')} : <span className="font-semibold text-[var(--color-text)]">{debouncedQuery}</span>
        </p>
      )}

      {/* Loading */}
      {loading && <PageSkeleton />}

      {/* Error */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && debouncedQuery && results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[var(--color-text-muted)] text-lg">
            {t('search.noResults')} "{debouncedQuery}"
          </p>
        </div>
      )}

      {/* Results grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-[var(--color-border)] disabled:opacity-50"
          >
            ‹
          </button>

          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg border ${page === p ? 'bg-primary text-black border-primary font-bold' : 'border-[var(--color-border)]'}`}
            >
              {p}
            </button>
          ))}

          <span className="px-2">...</span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-[var(--color-border)] disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
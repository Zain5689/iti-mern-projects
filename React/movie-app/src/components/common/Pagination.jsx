import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useTranslation()
  const maxVisiblePages = 5
  const safeTotal = Math.min(totalPages, 500) // TMDB max is 500

  const getPageNumbers = () => {
    const pages = []
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let end = Math.min(safeTotal, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < safeTotal) {
      if (end < safeTotal - 1) pages.push('...')
      pages.push(safeTotal)
    }

    return pages
  }

  if (safeTotal <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-card)] disabled:hover:text-inherit disabled:hover:border-[var(--color-border)]"
      >
        <ChevronLeft size={16} className="rtl-flip" />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-[var(--color-text-muted)]">…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-[40px] rounded-lg text-sm font-semibold transition-all ${
              page === currentPage
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-primary hover:text-white hover:border-primary'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === safeTotal}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-card)] disabled:hover:text-inherit disabled:hover:border-[var(--color-border)]"
      >
        <ChevronRight size={16} className="rtl-flip" />
      </button>
    </div>
  )
}

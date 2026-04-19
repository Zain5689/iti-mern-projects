import { useTranslation } from 'react-i18next'

export default function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  const { t } = useTranslation()

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onGenreChange(null)}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !selectedGenre
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary hover:text-primary'
        }`}
      >
        {t('home.allGenres')}
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedGenre === genre.id
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary hover:text-primary'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

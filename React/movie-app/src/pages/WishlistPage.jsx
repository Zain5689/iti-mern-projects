import { usePageTitle } from '@/hooks'
import { useWishlistStore } from '@/store'
import { Link } from 'react-router'
import { HeartOff } from 'lucide-react'
import WishlistCard from '@/components/movie/WishlistCard'
import { useTranslation } from 'react-i18next'

export default function WishlistPage() {
  const { t } = useTranslation()
  usePageTitle('Wishlist')
  const { wishlist } = useWishlistStore()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-8">{t('wishlist.title')}</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <HeartOff size={100} className="text-gray-300" />
          <p className="text-[var(--color-text-muted)] text-lg"> {t('wishlist.empty')}</p>
          <Link to="/" className="btn-primary px-10">
            {t('wishlist.backHome')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map((movie) => (
            <WishlistCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
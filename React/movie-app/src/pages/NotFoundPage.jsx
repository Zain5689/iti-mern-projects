import { Link } from 'react-router'
import { usePageTitle } from '@/hooks'

export default function NotFoundPage() {
  usePageTitle('404 - Not Found')
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-8xl text-primary font-heading mb-4">404</h1>
      <p className="text-xl text-[var(--color-text-muted)] mb-8">Page not found</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )
}
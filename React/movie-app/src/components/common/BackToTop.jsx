import { useScrollToTop } from '@/hooks'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const { visible, scrollToTop } = useScrollToTop()

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 end-6 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-200 active:scale-95"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}
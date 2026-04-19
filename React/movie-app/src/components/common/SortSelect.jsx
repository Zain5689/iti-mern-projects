import { useTranslation } from 'react-i18next'
import { ArrowUpDown } from 'lucide-react'
import { SORT_OPTIONS } from '@/utils'

export default function SortSelect({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="relative flex items-center gap-2">
      <ArrowUpDown size={16} className="text-[var(--color-text-muted)]" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer appearance-none pe-8"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </div>
  )
}

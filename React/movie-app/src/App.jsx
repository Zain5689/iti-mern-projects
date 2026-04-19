import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRouter from './router'
import { useThemeStore } from './store'

export default function App() {
  const { isDark, language } = useThemeStore()

  // Apply theme + direction on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [isDark, language])

  return (
    <>
      <AppRouter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: isDark ? '#1c1c1c' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            border: '1px solid #E50914',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: { iconTheme: { primary: '#E50914', secondary: '#fff' } },
        }}
      />
    </>
  )
}
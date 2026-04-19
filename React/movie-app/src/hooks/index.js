import { useState, useEffect, useCallback, useRef } from 'react'

// ─── useDebounce ──────────────────────────────────────────────────────────────
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// ─── usePageTitle ─────────────────────────────────────────────────────────────
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | CineVault` : 'CineVault'
    return () => { document.title = 'CineVault' }
  }, [title])
}

// ─── useFetch ─────────────────────────────────────────────────────────────────
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)
  

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchFn()
      setData(response.data)
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err.response?.data?.status_message || err.message)
      }
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    execute()
  }, [execute])

  return { data, loading, error, refetch: execute }
}

// ─── useLocalAuth ─────────────────────────────────────────────────────────────
export function useLocalAuth() {
  const getUsers = () =>
    JSON.parse(localStorage.getItem('registered_users') || '[]')

  const register = ({ username, email, password }) => {
    const users = getUsers()
    const exists = users.find((u) => u.email === email)
    if (exists) throw new Error('Email already registered')

    const newUser = { id: Date.now(), username, email, password }
    localStorage.setItem('registered_users', JSON.stringify([...users, newUser]))
    return { id: newUser.id, username, email }
  }

  const login = ({ email, password }) => {
    const users = getUsers()
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password')
    return { id: user.id, username: user.username, email: user.email }
  }

  return { register, login }
}

// ─── useScrollToTop ───────────────────────────────────────────────────────────
export function useScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return { visible, scrollToTop }
}
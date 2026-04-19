import axios from 'axios'
import toast from 'react-hot-toast'

const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
})

// Request interceptor – inject language if stored
tmdbClient.interceptors.request.use((config) => {
  const lang = localStorage.getItem('app_language') || 'en'
  config.params = { ...config.params, language: lang }
  return config
})

// Response interceptor – global error handling
tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.status_message ||
      error.message ||
      'Something went wrong. Please try again.'

    toast.error(message, { id: 'api-error' })
    return Promise.reject(error)
  }
)

export default tmdbClient
import tmdbClient from './tmdbClient'

// ─── Movies ───────────────────────────────────────────────────────────────────

export const getNowPlaying = (page = 1) =>
  tmdbClient.get('/movie/now_playing', { params: { page } })

export const getMovieDetails = (id) =>
  tmdbClient.get(`/movie/${id}`)

export const getMovieRecommendations = (id, page = 1) =>
  tmdbClient.get(`/movie/${id}/recommendations`, { params: { page } })

export const getMovieVideos = (id) =>
  tmdbClient.get(`/movie/${id}/videos`)

export const discoverMovies = (params = {}) =>
  tmdbClient.get('/discover/movie', { params })

// ─── Search ───────────────────────────────────────────────────────────────────

export const searchMovies = (query, page = 1) =>
  tmdbClient.get('/search/movie', { params: { query, page } })

// ─── Genres ───────────────────────────────────────────────────────────────────

export const getGenres = () =>
  tmdbClient.get('/genre/movie/list')

// ─── Account (TMDB Auth) ──────────────────────────────────────────────────────

export const getFavoriteMovies = (accountId, sessionId, page = 1) =>
  tmdbClient.get(`/account/${accountId}/favorite/movies`, {
    params: { session_id: sessionId, page },
  })

export const addFavorite = (accountId, sessionId, mediaId, favorite = true) =>
  tmdbClient.post(
    `/account/${accountId}/favorite`,
    { media_type: 'movie', media_id: mediaId, favorite },
    { params: { session_id: sessionId } }
  )

// ─── TMDB Auth ────────────────────────────────────────────────────────────────

export const createRequestToken = () =>
  tmdbClient.get('/authentication/token/new')

export const createSession = (requestToken) =>
  tmdbClient.post('/authentication/session/new', {
    request_token: requestToken,
  })

export const getAccountDetails = (sessionId) =>
  tmdbClient.get('/account', { params: { session_id: sessionId } })
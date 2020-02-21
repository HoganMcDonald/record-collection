export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://stream-collector-rails.herokuapp.com'
    : 'http://localhost:3001'

export const localStorageKey = 'stream_collector'

import fetch from 'isomorphic-unfetch'

export class UnauthorizedError extends Error {}

const parseResponse = response => response.json()

const apiHost = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://hoganmcdonald.com'
    : 'http://localhost:3001'

export const get = (path: string) => {
  return fetch(apiHost() + path).then(parseResponse)
}

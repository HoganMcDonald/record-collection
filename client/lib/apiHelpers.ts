import fetch from 'isomorphic-unfetch'

import { AuthToken } from '../types'
import { apiUrl } from '../constants'
import { useAuth } from '../reducers/auth'

export const useApiRequests = () => {
  const { clearAuthToken, authToken } = useAuth()

  const getHeadersFromToken = (authToken: AuthToken) => {
    const authHeaders = new Headers()
    for (const key in authToken) {
      authHeaders.append(key, authToken[key])
    }
    return authHeaders
  }

  const parseErrorResponses = (error: fetch.IsomorphicResponse) => {
    switch (error.status) {
      case 401:
        return clearAuthToken()
      default:
        throw error
    }
  }

  const parseResponseBody = (response: fetch.IsomorphicResponse) =>
    response.json()

  const get = async (path: string) => {
    const response = await fetch(apiUrl + path, {
      method: 'GET',
      cache: 'no-cache',
      headers: getHeadersFromToken(authToken),
    })

    parseErrorResponses(response)
    return await parseResponseBody(response)
  }

  return { get }
}

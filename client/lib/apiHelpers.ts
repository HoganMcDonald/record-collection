import fetch from 'isomorphic-unfetch'

import { AuthToken } from '../types'
import { apiUrl } from '../constants'
import { useAuth } from '../reducers/auth'
import { useToasts } from '../reducers/toast'

export const useApiRequests = () => {
  const { clearAuthToken, authToken, setAuthToken } = useAuth()
  const { addToast } = useToasts()

  const getHeadersFromToken = (authToken: AuthToken) => {
    const authHeaders = new Headers()
    for (const key in authToken) {
      authHeaders.append(key, authToken[key])
    }
    return authHeaders
  }

  const updateAuthTokenFromHeaders = (response: fetch.IsomorphicResponse) => {
    const updatedToken: AuthToken = {
      uid: response.headers.get('uid'),
      client: response.headers.get('client'),
      expiry: response.headers.get('expiry'),
      'access-token': response.headers.get('access-token'),
      'token-type': 'Bearer',
    }

    if (updatedToken['access-token']) {
      setAuthToken(updatedToken)
    }
  }

  const parseResponse = async (response: fetch.IsomorphicResponse) => {
    const body = response.status === 204 ? {} : await response.json()

    const status: number = response.status
    if (body.errors || status >= 400) {
      switch (Math.min(status, 500)) {
        case 401:
          clearAuthToken()
          throw new Error(addToast('Please sign in to continue.').message)
        case 500:
          throw new Error(addToast('Something went wrong!').message)
        case 422:
          throw new Error(addToast(body.errors[0]).message)
        default:
          throw new Error(body.errors.join(', '))
      }
    }

    return body
  }

  const get = async (path: string) => {
    const response = await fetch(apiUrl + path, {
      method: 'GET',
      cache: 'no-cache',
      headers: getHeadersFromToken(authToken),
    })

    updateAuthTokenFromHeaders(response)
    return await parseResponse(response)
  }

  const put = async (path: string, data: object) => {
    const headers = getHeadersFromToken(authToken)
    headers.append('Content-Type', 'application/json')
    const response = await fetch(apiUrl + path, {
      method: 'PUT',
      cache: 'no-cache',
      headers,
      body: JSON.stringify(data),
    })

    updateAuthTokenFromHeaders(response)
    return await parseResponse(response)
  }

  return { get, put }
}

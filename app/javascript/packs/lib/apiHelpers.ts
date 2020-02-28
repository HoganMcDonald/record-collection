import { useDispatch } from 'react-redux'

import { apiNamespace } from '../constants'
import { useToasts } from '../reducers/toast'
import { logOut } from '../reducers/users'

export const useApiRequests = () => {
  const dispatch = useDispatch()
  const { addToast } = useToasts()

  const requestHeaders = () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    return headers
  }

  const parseResponse = async (response: Response) => {
    const body = response.status === 204 ? {} : await response.json()

    const status: number = response.status
    if (body.errors || status >= 400) {
      switch (Math.min(status, 500)) {
        case 401:
          dispatch(logOut())
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
    const response = await fetch(apiNamespace + path, {
      method: 'GET',
      cache: 'no-cache',
      headers: requestHeaders(),
    })

    return await parseResponse(response)
  }

  const put = async (path: string, data: object) => {
    const response = await fetch(apiNamespace + path, {
      method: 'PUT',
      cache: 'no-cache',
      headers: requestHeaders(),
      body: JSON.stringify(data),
    })

    return await parseResponse(response)
  }

  return { get, put }
}

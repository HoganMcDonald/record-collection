import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSlice, PayloadAction } from 'redux-starter-kit'

import { AuthToken } from '../types'
import { State } from '../store'
import { isEnv } from '../lib/helpers'
import { localStorageKey } from '../constants'

export interface Auth {
  authToken: AuthToken
}

const initialState: Auth = {
  authToken: {
    uid: '',
    expiry: '',
    'access-token': '',
    client: '',
  },
}

const authSlice = createSlice({
  slice: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => action.payload,
  },
})

export default authSlice.reducer

export const useAuth = () => {
  const dispatch = useDispatch()
  const authToken = useSelector((state: State) => state.auth.authToken)

  React.useEffect(() => {
    if (isEnv('client')) {
      const authToken: AuthToken = JSON.parse(
        window.localStorage.getItem(localStorageKey)
      )
      dispatch(authSlice.actions.setAuth({ authToken }))
    }
  }, [])

  const setAuthToken = (authToken: AuthToken) => {
    dispatch(authSlice.actions.setAuth({ authToken }))
    if (isEnv('client')) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(authToken))
    }
  }

  return { authToken, setAuthToken }
}

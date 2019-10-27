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

const clearedState: Auth = {
  authToken: {
    uid: '',
    expiry: '',
    'access-token': '',
    client: '',
    'token-type': 'Bearer',
  },
}

let initialState = clearedState

if (isEnv('client')) {
  const authToken: AuthToken = JSON.parse(
    window.localStorage.getItem(localStorageKey)
  )
  initialState = { authToken }
}

const authSlice = createSlice({
  slice: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => action.payload,
    clearAuth: state => clearedState,
  },
})

export default authSlice.reducer

export const useAuth = () => {
  const dispatch = useDispatch()
  const authToken = useSelector((state: State) => state.auth.authToken)
  const loggedIn = useSelector(
    (state: State) => !!state.auth.authToken['access-token']
  )

  const setAuthToken = (authToken: AuthToken) => {
    dispatch(authSlice.actions.setAuth({ authToken }))
    if (isEnv('client')) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(authToken))
    }
  }

  const clearAuthToken = () => {
    dispatch(authSlice.actions.clearAuth())
    if (isEnv('client')) {
      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(clearedState.authToken)
      )
    }
  }

  return { authToken, setAuthToken, clearAuthToken, loggedIn }
}

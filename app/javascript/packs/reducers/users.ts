import { useDispatch, useSelector } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from '../store'
import { useApiRequests } from '../lib/apiHelpers'
import { ApiUser } from '../types'

export interface EphemeralUser {
  fetching: boolean
}

export type User = ApiUser & EphemeralUser

const clearedState: User = {
  email: '',
  username: '',
  name: '',
  nickname: '',
  image: '',
  fetching: false,
}

const initialState: User = {
  ...clearedState,
  ...window._redux_store.state.user,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    beginFetchUser: state => ({ ...state, fetching: true }),
    failedFetchUser: state => ({ ...state, fetching: false }),
    receiveUser: (state, action: PayloadAction<ApiUser>) => ({
      ...state,
      ...action.payload,
      fetching: false,
    }),
    resetUser: () => ({ ...clearedState }),
  },
})

export const logOut = userSlice.actions.resetUser

export default userSlice.reducer

export const useUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.user)
  const loggedIn = useSelector((state: State) => !!state.user.email)
  const { get } = useApiRequests()

  const getMe = async () => {
    try {
      dispatch(userSlice.actions.beginFetchUser())
      const response: ApiUser = await get('/me')
      dispatch(userSlice.actions.receiveUser(response))
    } catch (error) {
      dispatch(userSlice.actions.failedFetchUser())
      console.error(error)
    }
  }

  const logOut = () => dispatch(userSlice.actions.resetUser())

  return { user, getMe, loggedIn, logOut }
}

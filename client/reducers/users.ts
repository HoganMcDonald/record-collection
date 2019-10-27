import { useDispatch, useSelector } from 'react-redux'
import { createSlice, PayloadAction } from 'redux-starter-kit'
import { State } from '../store'
import { useApiRequests } from '../lib/apiHelpers'
import { ApiUser } from '../types'

export interface EphemeralUser {
  fetching: boolean
}

export type User = ApiUser & EphemeralUser

const initialState: User = {
  email: '',
  username: '',
  name: '',
  nickname: '',
  image: '',
  fetching: false,
}

const userSlice = createSlice({
  slice: 'users',
  initialState,
  reducers: {
    beginFetchUser: state => ({ ...state, fetching: true }),
    failedFetchUser: state => ({ ...state, fetching: false }),
    receiveUser: (state, action: PayloadAction<ApiUser>) => ({
      ...state,
      ...action.payload,
      fetching: false,
    }),
  },
})

export default userSlice.reducer

export const useUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.user)
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

  return { user, getMe }
}

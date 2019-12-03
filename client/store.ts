import { configureStore } from 'redux-starter-kit'

import userReducer, { User } from './reducers/users'
import authReducer, { Auth } from './reducers/auth'
import playerReducer, { Player } from './reducers/player'
import toastReducer, { Toasts } from './reducers/toast'

export type State = {
  auth: Auth
  user: User
  player: Player
  toasts: Toasts
}

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    player: playerReducer,
    toasts: toastReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

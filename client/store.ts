import { configureStore } from 'redux-starter-kit'

import userReducer, { User } from './reducers/users'
import authReducer, { Auth } from './reducers/auth'
import playerReducer, { Player } from './reducers/player'

export type State = {
  auth: Auth
  user: User
  player: Player
}

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    player: playerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

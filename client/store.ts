import { configureStore } from 'redux-starter-kit'

import userReducer, { User } from './reducers/users'
import authReducer, { Auth } from './reducers/auth'

export type State = {
  auth: Auth
  user: User
}

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

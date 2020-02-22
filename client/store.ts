import { configureStore } from 'redux-starter-kit'

import userReducer, { User } from './reducers/users'
import authReducer, { Auth } from './reducers/auth'
import playerReducer, { Player } from './reducers/player'
import toastReducer, { Toasts } from './reducers/toast'
import searchReducer, { SearchResults } from './reducers/search'
import collectionsReducer, { Collections } from './reducers/collection'

export type State = {
  auth: Auth
  user: User
  player: Player
  toasts: Toasts
  search: SearchResults
  collections: Collections
}

const createStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer,
      player: playerReducer,
      toasts: toastReducer,
      search: searchReducer,
      collections: collectionsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export default createStore

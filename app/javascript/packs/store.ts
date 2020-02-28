import { configureStore } from '@reduxjs/toolkit'

import userReducer, { User } from './reducers/users'
import playerReducer, { Player } from './reducers/player'
import toastReducer, { Toasts } from './reducers/toast'
import searchReducer, { SearchResults } from './reducers/search'
import collectionsReducer, { Collections } from './reducers/collection'

export type State = {
  user: User
  player: Player
  toasts: Toasts
  search: SearchResults
  collections: Collections
}

export default configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    toasts: toastReducer,
    search: searchReducer,
    collections: collectionsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

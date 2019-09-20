import { configureStore } from 'redux-starter-kit'

import userReducer from './reducers/users'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

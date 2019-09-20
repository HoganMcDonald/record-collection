import { createSlice, PayloadAction } from 'redux-starter-kit'

interface User {
  email: string
}

const initialState: User = {
  email: '',
}

const userSlice = createSlice({
  slice: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => action.payload,
  },
})

export default userSlice.reducer

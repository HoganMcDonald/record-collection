import { useDispatch, useSelector } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { State } from '../store'

interface Toast {
  id: string
  message: string
  autoClose: boolean
}

export type Toasts = Toast[]

const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => [
      ...state,
      action.payload,
    ],
    removeToast: (state, action: PayloadAction<string>) =>
      state.filter(toast => toast.id !== action.payload),
  },
})

export default toastSlice.reducer

export const useToasts = () => {
  const dispatch = useDispatch()
  const toasts = useSelector((state: State) => state.toasts)

  const addToast = (message: string, autoClose: boolean = true) => {
    const id = Math.random()
      .toString(36)
      .substr(2, 9)
    const newToast = { id, message, autoClose }

    dispatch(toastSlice.actions.addToast(newToast))

    return newToast
  }

  const removeToast = (id: string) => {
    dispatch(toastSlice.actions.removeToast(id))
  }

  return { toasts, addToast, removeToast }
}

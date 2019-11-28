import { useDispatch, useSelector } from 'react-redux'
import { createSlice, PayloadAction } from 'redux-starter-kit'
import { State } from '../store'
import { useApiRequests } from '../lib/apiHelpers'
import { ApiPlayer } from '../types'

export type Player = ApiPlayer

const initialState: Player = {
  isPlaying: false,
  progress: 0,
  trackDuration: 0,
  shuffle: false,
  repeat: 'off',
  nowPlaying: {
    trackName: null,
    trackURI: null,
    artistName: null,
    artistURI: null,
    albumName: null,
    albumURI: null,
    albumCover: null,
  },
  device: {
    name: null,
    volume: 0,
  },
}

const playerSlice = createSlice({
  slice: 'player',
  initialState,
  reducers: {
    receivePlayer: (state, action: PayloadAction<ApiPlayer>) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export default playerSlice.reducer

export const usePlayer = () => {
  const dispatch = useDispatch()
  const playerStatus = useSelector((state: State) => state.player)
  const { get } = useApiRequests()

  const getPlayerStatus = async () => {
    try {
      const response: ApiPlayer = await get('/player')
      dispatch(playerSlice.actions.receivePlayer(response))
    } catch (error) {
      console.error(error)
    }
  }

  return { playerStatus, getPlayerStatus }
}

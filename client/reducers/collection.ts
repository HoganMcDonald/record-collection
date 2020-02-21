import { useApiRequests } from '../lib/apiHelpers'
import { ApiCollection, SpotifyUri } from '../types'
import { createSlice, PayloadAction } from 'redux-starter-kit'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../store'

export type Collections = {
  defaultCollection: ApiCollection & {
    fetching: boolean
  }
}

const initialState: Collections = {
  defaultCollection: {
    name: '__default_collection__',
    default: true,
    fetching: false,
    albums: [],
  },
}

const collectionsSlice = createSlice({
  slice: 'collections',
  initialState,
  reducers: {
    beginGetCollection: state => ({
      ...state,
      defaultCollection: {
        ...state.defaultCollection,
        fetching: true,
      },
    }),
    failedCollection: state => ({
      ...state,
      defaultCollection: { ...state.defaultCollection, fetching: false },
    }),
    receiveCollection: (_, action: PayloadAction<ApiCollection>) => ({
      defaultCollection: {
        ...action.payload,
        fetching: false,
      },
    }),
    beginAddToCollection: state => ({
      ...state,
      defaultCollection: {
        ...state.defaultCollection,
        fetching: true,
      },
    }),
  },
})

export default collectionsSlice.reducer

export const useCollections = () => {
  const dispatch = useDispatch()
  const defaultCollection = useSelector(
    (state: State) => state.collections.defaultCollection
  )
  const { get, put } = useApiRequests()

  const getDefaultCollection = async () => {
    try {
      dispatch(collectionsSlice.actions.beginGetCollection())
      const collection: ApiCollection = await get('/collection')
      dispatch(collectionsSlice.actions.receiveCollection(collection))
    } catch (error) {
      dispatch(collectionsSlice.actions.failedCollection())
      console.error(error)
    }
  }

  const addToDefaultCollection = async (uri: SpotifyUri) => {
    try {
      dispatch(collectionsSlice.actions.beginAddToCollection())
      const collection: ApiCollection = await put('/collection', { uri })
      dispatch(collectionsSlice.actions.receiveCollection(collection))
    } catch (error) {
      dispatch(collectionsSlice.actions.failedCollection())
      console.error(error)
    }
  }

  return { defaultCollection, getDefaultCollection, addToDefaultCollection }
}

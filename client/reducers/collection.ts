import { useApiRequests } from '../lib/apiHelpers'
import { ApiCollection } from '../types'
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
    failedGetCollection: state => ({
      ...state,
      defaultCollection: { ...state.defaultCollection, fetching: false },
    }),
    receiveCollection: (_, action: PayloadAction<ApiCollection>) => ({
      defaultCollection: {
        ...action.payload,
        fetching: false,
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
  const { get } = useApiRequests()

  const getDefaultCollection = async () => {
    try {
      dispatch(collectionsSlice.actions.beginGetCollection())
      const collection: ApiCollection = await get('/collection')
      dispatch(collectionsSlice.actions.receiveCollection(collection))
    } catch (error) {
      dispatch(collectionsSlice.actions.failedGetCollection())
      console.error(error)
    }
  }

  return { defaultCollection, getDefaultCollection }
}

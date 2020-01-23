import { useDispatch, useSelector } from 'react-redux'
import { createSlice, PayloadAction } from 'redux-starter-kit'
import { State } from '../store'
import { useApiRequests } from '../lib/apiHelpers'
import { SearchResults as ApiSearchResults } from '../types'

export type SearchResults = ApiSearchResults & {
  query: string
  fetching: boolean
}

const initialState: SearchResults = {
  albums: [],
  artists: [],
  tracks: [],
  query: null,
  fetching: false,
}

const searchSlice = createSlice({
  slice: 'searchResults',
  initialState,
  reducers: {
    beginSearch: (state, action: PayloadAction<string>) => ({
      ...state,
      fetching: true,
      query: action.payload,
    }),
    failedSearch: state => ({ ...state, fetching: false }),
    receiveSearchResults: (state, action: PayloadAction<ApiSearchResults>) => ({
      ...state,
      ...action.payload,
      fetching: false,
    }),
  },
})

export default searchSlice.reducer

export const useSearch = () => {
  const dispatch = useDispatch()
  const searchResults = useSelector((state: State) => state.search)
  const { get } = useApiRequests()

  const search = async (searchTerm: string) => {
    try {
      const searchQuery = encodeSearchTerms(searchTerm)
      dispatch(searchSlice.actions.beginSearch())
      const searchResults: ApiSearchResults = await get(
        `/search?q=${searchQuery}`
      )
      dispatch(searchSlice.actions.receiveSearchResults(searchResults))
    } catch (error) {
      dispatch(searchSlice.actions.failedSearch())
      console.error(error)
    }
  }

  const encodeSearchTerms = (searchTerm: string) =>
    encodeURIComponent(searchTerm)

  return { search, searchResults }
}

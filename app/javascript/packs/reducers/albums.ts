import * as React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { AlbumDetail, SpotifyUri, Album } from '../types'
import { numberCachedAlbums } from '../constants'
import { State } from '../store'
import { useApiRequests } from '../lib/apiHelpers'
import { parseUri } from '../lib/uriParser'

export type Albums = {
  albums: AlbumDetail[]
  fetching: boolean
}

const initialState: Albums = {
  albums: [],
  fetching: false,
}

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    beginGetAlbum: state => ({
      ...state,
      fetching: true,
    }),
    receiveAlbum: (state, action: PayloadAction<AlbumDetail>) => ({
      ...state,
      albums: [action.payload, ...state.albums.slice(0, numberCachedAlbums)],
    }),
    failedReceiveAlbum: state => ({
      ...state,
      fetching: false,
    }),
  },
})

export default albumsSlice.reducer

export const useAlbums = (id: string) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.albums.fetching)
  const album = useSelector(
    (state: State) =>
      state.albums.albums.find(album => parseUri(album.uri).id === id) || null
  )
  const { get } = useApiRequests()

  React.useEffect(() => {
    if (album === null) {
      getAlbum()
    }
  }, [album])

  const getAlbum = async () => {
    try {
      dispatch(albumsSlice.actions.beginGetAlbum())
      const album: AlbumDetail = await get(`/album/${id}`)
      dispatch(albumsSlice.actions.receiveAlbum(album))
    } catch (error) {
      dispatch(albumsSlice.actions.failedReceiveAlbum())
      console.error(error)
    }
  }

  return {
    album,
    loading,
  }
}

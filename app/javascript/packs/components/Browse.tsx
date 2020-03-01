import * as React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import { useSearch } from '../reducers/search'
import { Container } from './styled'
import Carousel from './Carousel'
import SongTable from './SongTable'

const BrowseContainer = styled(Container)`
  padding-top: 0;
`

const Browse: React.FC = () => {
  const { search: queryString } = useLocation()
  const { searchResults, search } = useSearch()

  React.useEffect(() => {
    const query = new URLSearchParams(queryString)
    if (query.has('q')) {
      search(query.get('q'))
    }
  }, [])

  return (
    <BrowseContainer>
      {searchResults.albums.length > 0 && (
        <Carousel title="Albums" items={searchResults.albums} />
      )}
      {searchResults.artists.length > 0 && (
        <Carousel title="Artists" items={searchResults.artists} />
      )}
      {searchResults.tracks.length > 0 && (
        <SongTable title="Songs" tracks={searchResults.tracks} />
      )}
    </BrowseContainer>
  )
}

export default Browse

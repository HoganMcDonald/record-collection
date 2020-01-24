import * as React from 'react'

import { useSearch } from '../reducers/search'
import { Container } from './styled'
import SearchBar from './SearchBar'
import Carousel from './Carousel'

const Browse: React.FC = () => {
  const { searchResults } = useSearch()

  return (
    <Container>
      <SearchBar />
      {searchResults.albums.length > 0 && (
        <Carousel title="Albums" items={searchResults.albums} />
      )}
      {searchResults.artists.length > 0 && (
        <Carousel title="Artists" items={searchResults.artists} />
      )}
    </Container>
  )
}

export default Browse

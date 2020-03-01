import * as React from 'react'
import styled from 'styled-components'

import { useSearch } from '../reducers/search'
import { Container } from './styled'
import Carousel from './Carousel'

const BrowseContainer = styled(Container)`
  padding-top: 0;
`

const Browse: React.FC = () => {
  const { searchResults } = useSearch()

  return (
    <BrowseContainer>
      {searchResults.albums.length > 0 && (
        <Carousel title="Albums" items={searchResults.albums} />
      )}
      {searchResults.artists.length > 0 && (
        <Carousel title="Artists" items={searchResults.artists} />
      )}
    </BrowseContainer>
  )
}

export default Browse

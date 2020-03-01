import * as React from 'react'
import styled from 'styled-components'

import Tile from './Tile'
import { Album } from '../types'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
`

interface GridProps {
  albums: Album[]
  disableAddToCollection?: boolean
}

const Grid: React.FC<GridProps> = ({ albums, disableAddToCollection }) => {
  return (
    <GridContainer>
      {albums.map((album, index) => (
        <Tile
          item={album}
          key={index}
          disableAddToCollection={disableAddToCollection}
        />
      ))}
    </GridContainer>
  )
}

export default Grid

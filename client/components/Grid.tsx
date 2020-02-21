import React from 'react'
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
}

const Grid: React.FC<GridProps> = ({ albums }) => {
  return (
    <GridContainer>
      {albums.map(album => (
        <Tile item={album} />
      ))}
    </GridContainer>
  )
}

export default Grid

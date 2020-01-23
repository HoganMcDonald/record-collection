import React from 'react'
import styled from 'styled-components'

import { CarouselItem } from './Carousel'
import { isAlbum } from '../lib/identifyCarouselItemType'
import { SpotifyUri } from '../types'
import { resourceLocation } from '../lib/uriParser'

const TileContainer = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
`

interface TileProps {
  item: CarouselItem
}

const Tile: React.FC<TileProps> = ({ item }) => {
  function navigateToResource(event: React.MouseEvent, uri: SpotifyUri) {
    event.preventDefault()
    // TODO: Routing
    console.log(resourceLocation(uri))
  }

  if (isAlbum(item)) {
    const album = item
    return (
      <TileContainer
        onClick={e => navigateToResource(e, album.uri)}
        href={resourceLocation(album.uri)}>
        <img src={album.images.large.url} alt="" />
        <p>{album.name}</p>
        <p>{album.artist.name}</p>
      </TileContainer>
    )
  }
  return null
}

export default Tile

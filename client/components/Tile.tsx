import React from 'react'
import styled from 'styled-components'

import { CarouselItem } from './Carousel'
import { isAlbum } from '../lib/identifyCarouselItemType'
import { SpotifyUri } from '../types'
import { resourceLocation } from '../lib/uriParser'

const PrimaryText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.125rem;
  font-weight: bold;
`

const TileContainer = styled.a`
  text-decoration: none;
`

const Thumbnail = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const ThumbnailContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.thumbnail};
  padding-top: 100%;
  position: relative;
  margin-bottom: 1rem;
`

const SecondaryText = styled.p`
  color: ${({ theme }) => theme.colors.gray};
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
        <ThumbnailContainer>
          <Thumbnail src={album.images.large.url} alt="" />
        </ThumbnailContainer>
        <PrimaryText>{album.name}</PrimaryText>
        <SecondaryText>{album.artist.name}</SecondaryText>
      </TileContainer>
    )
  }
  return null
}

export default Tile

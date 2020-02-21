import React from 'react'
import styled from 'styled-components'

import { CarouselItem } from './Carousel'
import { isAlbum, isArtist } from '../lib/identifyCarouselItemType'
import { SpotifyUri } from '../types'
import { resourceLocation } from '../lib/uriParser'
import { useCollections } from '../reducers/collection'

const PrimaryText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.825rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`

const TileContainer = styled.a`
  text-decoration: none;
`

const Thumbnail = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ThumbnailContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.thumbnail};
  padding-top: 100%;
  position: relative;
  margin-bottom: 1rem;
`

const SecondaryText = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`

interface TileProps {
  item: CarouselItem
}

const Tile: React.FC<TileProps> = ({ item }) => {
  const { addToDefaultCollection } = useCollections()

  function navigateToResource(event: React.MouseEvent, uri: SpotifyUri) {
    event.preventDefault()
    // TODO: Routing
    console.log(resourceLocation(uri))
    addToDefaultCollection(uri)
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
  } else if (isArtist(item)) {
    const artist = item
    return (
      <TileContainer
        onClick={e => navigateToResource(e, artist.uri)}
        href={resourceLocation(artist.uri)}>
        <ThumbnailContainer>
          {artist.images && <Thumbnail src={artist.images.large.url} alt="" />}
        </ThumbnailContainer>
        <PrimaryText>{artist.name}</PrimaryText>
      </TileContainer>
    )
  }
  return null
}

export default Tile

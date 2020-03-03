import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { CarouselItem } from './Carousel'
import { isAlbum, isArtist } from '../lib/identifyCarouselItemType'
import { SpotifyUri } from '../types'
import { resourceLocation } from '../lib/uriParser'
import { useCollections } from '../reducers/collection'
import TileActionButton from './TileActionButton'
import { useToasts } from '../reducers/toast'
import LazyImage from './LazyImage'

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

const ArtistTitle = styled(PrimaryText)`
  text-align: center;
`

const TileContainer = styled(Link)`
  text-decoration: none;
`

const artistThumbnailStyles = css`
  border-radius: 999px;
  overflow: hidden;
`

const Thumbnail = styled(LazyImage)<{ circle?: boolean }>`
  margin-bottom: 1rem;

  ${({ circle }) => circle && artistThumbnailStyles}
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
  disableAddToCollection?: boolean
}

const Tile: React.FC<TileProps> = ({ item, disableAddToCollection }) => {
  const { addToDefaultCollection } = useCollections()
  const { addToast } = useToasts()

  const [showActions, setShowActions] = React.useState<boolean>(false)

  function navigateToResource(event: React.MouseEvent, uri: SpotifyUri) {
    event.preventDefault()
    // TODO: Routing
    console.log(resourceLocation(uri))
  }

  const handleAddToCollection = () => {
    addToDefaultCollection(item.uri).then(() =>
      addToast(`"${item.name}" saved to your collection!`)
    )
  }

  if (isAlbum(item)) {
    const album = item
    return (
      <TileContainer
        onMouseEnter={() => setShowActions(!disableAddToCollection && true)}
        onMouseLeave={() => setShowActions(false)}
        to={resourceLocation(album.uri)}>
        <Thumbnail src={album.images.large.url} alt="">
          {showActions && (
            <TileActionButton onAddToCollection={handleAddToCollection} />
          )}
        </Thumbnail>
        <PrimaryText>{album.name}</PrimaryText>
        <SecondaryText>{album.artist.name}</SecondaryText>
      </TileContainer>
    )
  } else if (isArtist(item)) {
    const artist = item
    return (
      <TileContainer to={resourceLocation(artist.uri)}>
        <Thumbnail src={artist.images && artist.images.large.url} alt="" />
        <ArtistTitle>{artist.name}</ArtistTitle>
      </TileContainer>
    )
  }
  return null
}

export default Tile

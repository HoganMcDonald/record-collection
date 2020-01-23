import { CarouselItem } from '../components/Carousel'
import { Album, Artist, Track } from '../types'
import { parseUri } from '../lib/uriParser'

export function isAlbum(item: CarouselItem): item is Album {
  return parseUri(item.uri).type === 'album'
}

export function isTrack(item: CarouselItem): item is Track {
  return parseUri(item.uri).type === 'track'
}

export function isArtist(item: CarouselItem): item is Artist {
  return parseUri(item.uri).type === 'artist'
}

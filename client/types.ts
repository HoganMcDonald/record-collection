export interface Album {
  uri: SpotifyUri
  name: string
  artist: Artist
  images: SpotifyImages
}

export interface AuthToken {
  expiry: string
  uid: string
  'access-token': string
  client: string
  'token-type': 'Bearer'
}

export interface ApiUser {
  email: string
  username: string
  name?: string
  nickname?: string
  image?: string
}

export interface ApiPlayer {
  isPlaying: boolean
  progress: number
  trackDuration: number
  shuffle: boolean
  repeat: 'off' | 'context' | 'track'
  nowPlaying: {
    trackName: string
    trackURI: string
    artistName: string
    artistURI: string
    albumName: string
    albumURI: string
    albumCover: string
  }
  device: {
    name: string
    volume: number
  }
}

export interface Artist {
  uri: SpotifyUri
  name: string
  images?: SpotifyImages
}

export interface SearchResults {
  albums: Album[]
  artists: Artist[]
  tracks: Track[]
}

export type SpotifyUri = string

interface SpotifyImage {
  height: number
  width: number
  url: string
}

export interface SpotifyImages {
  large: SpotifyImage
  medium: SpotifyImage
  small: SpotifyImage
}

export interface Track {
  uri: SpotifyUri
  name: string
  artist: Artist
  album: Album
}

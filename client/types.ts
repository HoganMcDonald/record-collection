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
